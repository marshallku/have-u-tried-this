import FrontPage from "./FrontPage";
import PostPage from "./PostPage";
import SignInPage from "./SignInPage";
import UploadPage from "./UploadPage";
import UserPage from "./UserPage";
import ListPage from "./ListPage";

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
  if (initializing) return false;

  if (page !== "post") {
    const fixedContainer = document.querySelector(".fixed-container");

    if (fixedContainer && isPopstate) {
      fixedContainer.remove();

      return false;
    }

    window.scrollTo(0, 0);
    removeWindowEventListener();
    resetApp();
    return true;
  }

  window.scrollTo(0, 0);
  return true;
}

export default function renderPage(page, isPopstate) {
  const initializing = !document.getElementById("app").firstChild;
  const shouldAppend = isReset({ page, initializing, isPopstate });

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
      app.append(UserPage());
      break;
    default:
      app.innerText = "ERROR";
  }
}
