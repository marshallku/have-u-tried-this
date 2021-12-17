import renderHeader from "../components/Header";
import renderPage from "../pages";

export function route() {
  const path = window.location.pathname.split("/")[1];

  renderHeader(path);
  renderPage(path);
}

export function customRouter() {
  const router = {
    base: "",
    baseElement: null,
    routes: {},
    navigators: [],
    update(path) {
      const uriPath = `/${this.base}${path === "/" ? "" : path}`;

      window.scrollTo(0, 0);
      window.history.pushState("", document.title, uriPath);

      this.navigators.forEach((x) => x.classList.remove("highlight"));
      this.navigators
        .filter((x) => x.pathname === uriPath)
        .forEach((x) => x.classList.add("highlight"));

      if (this.routes[path]) {
        this.baseElement.innerHTML = "";
        this.baseElement.append(this.routes[path]());
      }
    },
    addNavigator(elt, path) {
      elt.setAttribute("href", `/${this.base}${path === "/" ? "" : path}`);
      elt.addEventListener("click", (event) => {
        event.preventDefault();
        this.update(path);
      });
      this.navigators.push(elt);
    },
    initialize(path) {
      this.update(path);
    },
  };

  return router;
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
