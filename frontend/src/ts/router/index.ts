import Modal from "../components/Modal";
import renderPage from "../pages";
import removeHash from "../utils/history";
import { unlock } from "./lock";

export function route(isPopstate?: boolean) {
  const path = window.location.pathname.split("/")[1];

  renderPage(path, isPopstate || false);
}

export function customRouter(): ICustomRouter {
  return {
    base: "",
    baseElement: null,
    routes: {},
    navigators: [],
    update(path, init) {
      const uriPath = `/${this.base}${path === "/" ? "" : path}`;
      window.scrollTo(0, 0);
      if (!init) {
        window.history.pushState("", document.title, uriPath);
      }
      this.navigators.forEach((x) => x.classList.remove("highlight"));
      this.navigators
        .filter((x) => x instanceof HTMLAnchorElement && x.pathname === uriPath)
        .forEach((x) => x.classList.add("highlight"));

      if (this.baseElement && this.routes[path]) {
        this.baseElement.innerHTML = "";
        this.baseElement.append(this.routes[path]());
      }
    },
    addNavigator(elt: HTMLElement, path: string) {
      elt.setAttribute("href", `/${this.base}${path === "/" ? "" : path}`);
      elt.addEventListener("click", (event) => {
        event.preventDefault();
        this.update(path);
      });
      this.navigators.push(elt);
    },
    initialize(path) {
      this.update(path, true);
    },
  };
}

export function replacePath(path: string): void {
  window.history.replaceState("", document.title, path);
  route();
}

export function updatePath(path: string): void {
  // Check if router is locked
  if (window.location.hash === "#locked") {
    const app = document.getElementById("app");

    app?.append(
      Modal({
        title: "내용이 사라집니다!",
        content: "페이지를 벗어나시겠습니까?",
        callback: () => {
          unlock();
          replacePath(path);
        },
      }),
    );

    return;
  }

  window.history.pushState("", document.title, path);
  route();
}

export function addClickEvent(elt: HTMLElement, path: string): void {
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
