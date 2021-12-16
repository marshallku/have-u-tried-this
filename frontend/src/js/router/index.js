import renderPage from "../pages";

export function route() {
  const path = window.location.pathname.split("/")[1];

  renderPage(path);
}

export function updatePath(path) {
  window.history.pushState("", document.title, path);
  route();
}

export function addClickEvent(elt, path) {
  elt.addEventListener("click", (event) => {
    event.preventDefault();
    updatePath(path);
  });
}

export function initializeRouter() {
  route();

  document.querySelectorAll("a").forEach((elt) => {
    addClickEvent(elt, elt.pathname);
  });

  window.addEventListener("popstate", (event) => {
    event.preventDefault();
    route();
  });
}
