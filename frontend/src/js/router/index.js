import renderHeader from "../components/Header";
import Modal from "../components/Modal";
import renderPage from "../pages";
import removeHash from "../utils/history";
import { unlock } from "./lock";

export function route(isPopstate) {
  const path = window.location.pathname.split("/")[1];

  renderHeader(path);
  renderPage(path, isPopstate);
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

export function replacePath(path) {
  window.history.replaceState("", document.title, path);
  route();
}

export function updatePath(path) {
  // Check if router is locked
  if (window.location.hash === "#locked") {
    Modal({
      title: "내용이 사라집니다!",
      content: "페이지를 벗어나시겠습니까?",
      callback: () => {
        unlock();
        replacePath(path);
      },
    });

    return;
  }

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
  // Remove location hash
  if (window.location.hash) {
    removeHash();
  }

  route();

  window.addEventListener("popstate", (event) => {
    if (window.location.pathname === "/add" && window.location.hash) return;
    event.preventDefault();
    route(true);
  });
}
