interface WaylandComponent {
  name: string;
  home: string;
  docs: string;
  hmOptionBody: string;
  hmOptionLink: string;
}

enum ChoiceType {
  Include = "inclusive",
  Exclusive = "exclusive",
}

interface WaylandCompList {
  target: string;
  choiceType: ChoiceType;
  options: WaylandComponent[];
}

interface OptionLists {
  wm: [];
}

// using a tagged template literal: https://www.tektutorialshub.com/typescript/typescript-tagged-templates/
function HM(inner: string) {
  return `
{ pkgs, config, ... }:

{
  # home manager setup
  programs.home-manager.enable = true;

  # create your basic desktop directories (Downloads, Documents, etc.)
  xdg = {
    enable = true;
    userDirs = {
      enable = true;
    };
  };

  ${inner}
}
`;
}

class HMState {
  private components: WaylandComponentSelector[] = [];

  public render() {
    const root = document.getElementById("wayland-hm-code-block");
    const lines = document.getElementById("wayland-hm-code-line-numbers");
    if (root && lines) {
      const hmContent: string = HM(
        this.components
          .filter((c) => c.selected)
          .map((c) => `#### ${c.data.name} #### \n ${c.data.hmOptionBody}`)
          .join("\n")
      );
      // use a regex to count how many times \n appears
      const lineCount: number = hmContent.match(/\n/g)?.length || 0;
      root.textContent = hmContent;
      
      let lineNumberContent: string = "\n";
      for (let i = 0; i < lineCount; i++) {
        lineNumberContent = lineNumberContent + `${i}.\n`;
      }
      lines.textContent = lineNumberContent;
    }
  }

  public addComponent(newComp: WaylandComponentSelector) {
    this.components.push(newComp);
  }
}

class WaylandComponentSelector {
  private targetElement: HTMLElement;
  public data: WaylandComponent;
  public selected: boolean = false;
  private stateRef: HMState;

  constructor(target: HTMLElement, data: WaylandComponent, stateRef: HMState) {
    this.targetElement = target;
    this.data = data;
    this.stateRef = stateRef;
  }

  public create() {
    const root = document.createElement("section");
    root.classList.add("wayland-comp-card");
    const title = document.createElement("h3");
    title.innerHTML = this.data.name;
    root.appendChild(title);

    const body = document.createElement("div");

    const check = document.createElement("input");
    check.addEventListener("change", (evt) => {
      this.selected = check.checked;
      if (check.checked) {
        root.classList.add("wayland-comp-card-selected");
      } else {
        root.classList.remove("wayland-comp-card-selected");
      }
      this.stateRef.render();
    });
    check.setAttribute("type", "checkbox");
    body.appendChild(check);

    const links = document.createElement("ul");
    const homeLink = document.createElement("li");
    const homeLinkInner = document.createElement("a");
    homeLinkInner.setAttribute("href", this.data.home);
    homeLinkInner.innerHTML = "Homepage";
    homeLink.appendChild(homeLinkInner);
    const docsLink = document.createElement("li");
    const docsLinkInner = document.createElement("a");
    docsLinkInner.setAttribute("href", this.data.docs);
    docsLinkInner.innerHTML = "Documentation";
    docsLink.appendChild(docsLinkInner);
    links.appendChild(homeLink);
    links.appendChild(docsLink);
    body.appendChild(links);

    root.append(body);

    this.targetElement.appendChild(root);
  }
}

function renderOptions(data: WaylandCompList[]) {
  const state = new HMState();

  document
    .querySelectorAll<HTMLElement>(".loading-block")
    .forEach((section) => {
      const sectionData: WaylandCompList | undefined = data.find(
        ({ target }) => target === section.getAttribute("id")
      );
      if (sectionData) {
        sectionData.options.forEach((opt) => {
          const newComponent = new WaylandComponentSelector(
            section as HTMLElement,
            opt,
            state
          );
          newComponent.create();
          state.addComponent(newComponent);
        });
      }
      section.classList.remove("loading-block");
    });

  state.render();
}

async function fetchComponentData(dataFile: string) {
  const data: WaylandCompList[] = await (await fetch(dataFile)).json();
  renderOptions(data);
}

document.addEventListener("DOMContentLoaded", () => {
  fetchComponentData("/data/wayland-parts.json");
});
