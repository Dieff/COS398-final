/****
 * Activate Dark Theme toggle
 */

type ThemeEvent = CustomEvent<{ targetTheme: string }>;

// toggles the theme attribute for the body and also emits a custom event
function setDarkTheme(): void {
  const body: HTMLBodyElement | null = document.querySelector("body");
  if (body) {
    const prev_attribute: string = body.getAttribute("data-theme") ?? "light";
    let newTheme: string = "light";
    if (prev_attribute === "light") {
      newTheme = "dark";
    }
    // write the new theme to local storage
    localStorage.setItem("theme", newTheme);
    body.setAttribute("data-theme", newTheme);

    // emit a custom HTML event to signal to grpahics that they need to change versions
    const themeChangeEvent = new CustomEvent<{ targetTheme: string }>("theme", {
      detail: { targetTheme: newTheme },
    });
    document.dispatchEvent(themeChangeEvent);
  }
}

// every img with a data-themable attribute is expected to have a dark variant
document.addEventListener("theme", (event: any) => {
  const { targetTheme } = event.detail;
  document.querySelectorAll<HTMLImageElement>("img").forEach((img) => {
    if (img.getAttribute("data-themable")) {
      const oldSrc: string | null = img.getAttribute("src");
      if (oldSrc && targetTheme == "dark") {
        img.setAttribute("src", `dark-${oldSrc}`);
      }
      if (oldSrc && targetTheme == "light") {
        img.setAttribute("src", oldSrc.substring(5));
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // we want to retain the theme between pages, so we can keep it in localStorage
  const initialTheme: string | null = localStorage.getItem("theme");
  if (initialTheme && initialTheme === "dark") {
    setDarkTheme();
  }

  // set an event listener for the theme toggle
  document
    .querySelector<HTMLInputElement>("#theme-toggle")
    ?.addEventListener("change", () => {
      setDarkTheme();
    });
});

/***
 * Expandable sections in the nav
 */
function expandNavSection(navSection: HTMLDivElement) {
  if (navSection.classList.contains("cnav-expanded")) {
    navSection.classList.remove("cnav-expanded");
  } else {
    navSection.classList.add("cnav-expanded");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // expand element
  const expandElement: HTMLSpanElement = document.createElement("button");
  expandElement.classList.add("nav-expand-button");

  // iterate through the nav sections and add the expander
  document
    .querySelectorAll<HTMLDivElement>(".collapsible-nav")
    .forEach((cNav) => {
      console.log(cNav);
      if (cNav.previousElementSibling) {
        const newExpander = expandElement.cloneNode() as HTMLSpanElement;
        newExpander.innerHTML = "V";
        newExpander.onclick = () => expandNavSection(cNav);
        cNav.previousElementSibling.after(newExpander);
      }
    });
});

/***
 * References
 * 
 * highlights the current reference when you visit the reference page
 */

function highlightRow(rowId: string) {
  const refRow = document.querySelector(rowId);
  if (refRow) {
    refRow.classList.add("highlighted-row");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const url: Location = document.location;
  if (url.pathname === "/references.html") {
    const curReference: string = url.hash;
    if (curReference && curReference.length > 0) {
      highlightRow(curReference);
    }
  }
});
