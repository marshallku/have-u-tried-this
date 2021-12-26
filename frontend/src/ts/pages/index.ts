import FrontPage from "./FrontPage";
import PostPage from "./PostPage";
import SignInPage from "./SignInPage";
import UploadPage from "./UploadPage";
import UserPage from "./UserPage";
import ListPage from "./ListPage";
import ErrorComponent from "../components/ErrorComponent";

function removeWindowEventListener() {
  window.removeEventListener("resize", window.resizeHandler);
}

function resetApp() {
  const app = document.getElementById("app");

  if (!app) return;

  while (app.firstChild) {
    app.firstChild.remove();
  }
}

function isReset({
  page,
  initializing,
  renderPostOnly,
  isPopstate,
}: {
  page: string;
  initializing?: boolean;
  renderPostOnly?: boolean;
  isPopstate?: boolean;
}) {
  if (initializing) return true;

  if (page !== "post") {
    const fixedContainer = document.querySelector(".fixed-container");

    if (fixedContainer && isPopstate) {
      document.documentElement.classList.remove("overflow-hidden");
      fixedContainer.remove();

      return false;
    }

    document.documentElement.classList.remove("overflow-hidden");
    window.scrollTo(0, 0);
    removeWindowEventListener();
    resetApp();
    return true;
  }

  if (!renderPostOnly)
    document.documentElement.classList.add("overflow-hidden");
  return true;
}

export default function renderPage(page: string, isPopstate: boolean) {
  const app = document.getElementById("app");
  if (!app) return;
  const isInitialized = !!app.firstChild;
  const isMasonry = !!document.querySelector(".masonry-container");
  const renderPostOnly = !isInitialized || !isMasonry;

  const shouldAppend = isReset({
    page,
    initializing: !isInitialized,
    renderPostOnly,
    isPopstate,
  });

  try {
    switch (page) {
      case "":
        app.append(FrontPage());
        break;
      case "location":
        if (shouldAppend) {
          app.append(ListPage());
        }
        break;
      case "post":
        if (renderPostOnly) {
          const header = document.querySelector(".header");
          if (header) header.remove();

          resetApp();
        }
        app.append(PostPage(!renderPostOnly));
        break;
      case "add":
        app.append(UploadPage());
        break;
      case "login":
        app.append(SignInPage());
        break;
      case "user":
        if (shouldAppend) {
          app.append(UserPage());
        }
        break;
      default:
        app.append(ErrorComponent());
    }
  } catch (err) {
    console.log(err);

    const header = document.querySelector(".header");
    if (header) header.remove();

    app.append(ErrorComponent());
  }
}
