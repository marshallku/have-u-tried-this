import renderPage from "../pages";

export function route() {
  const path = window.location.pathname.split("/")[1];

  renderPage(path);
}

export function initializeRouter() {
  route();

  window.addEventListener("popstate", (event) => {
    event.preventDefault();
    route();
  });
}

export function updatePath(path) {
  window.history.pushState("", document.title, path);
  route();
}
