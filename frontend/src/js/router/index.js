import renderHeader from "../components/Header";
import renderPage from "../pages";

export function route() {
  const path = window.location.pathname.split("/")[1];

  renderHeader(path);
  renderPage(path);
}

export function updatePath(path) {
  window.scrollTo(0, 0);
  window.history.pushState("", document.title, path);
  route();
}

export function addClickEvent(elt, path) {
  elt.setAttribute("href", path);
  elt.addEventListener("click", (event) => {
    event.preventDefault();
    updatePath(path);
  });
}

export function initializeRouter() {
  route();

  window.addEventListener("popstate", (event) => {
    event.preventDefault();
    route();
  });
}
