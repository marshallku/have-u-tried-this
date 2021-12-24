import FrontPage from "./FrontPage";
import PostPage from "./PostPage";
import SignInPage from "./SignInPage";
import UploadPage from "./UploadPage";
import UserPage from "./UserPage";
import ListPage from "./ListPage";
import ErrorComponent from "../components/ErrorComponent";

const app = document.getElementById("app");

function removeWindowEventListener() {
  window.removeEventListener("resize", window.resizeHandler);
}

function resetApp() {
  while (app.firstChild) {
    app.firstChild.remove();
  }
}

function isReset({ page, initializing, isPopstate }) {
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

  document.documentElement.classList.add("overflow-hidden");
  return true;
}

export default function renderPage(page, isPopstate) {
  const initializing = !document.getElementById("app").firstChild;
  const shouldAppend = isReset({ page, initializing, isPopstate });

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
        app.append(PostPage(!initializing));
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
