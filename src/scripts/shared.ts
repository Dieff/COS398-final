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
  document
    .querySelector<HTMLInputElement>("#theme-toggle")
    ?.addEventListener("change", () => {
      setDarkTheme();
    });
});
