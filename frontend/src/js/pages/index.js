import FrontPage from "./FrontPage";
import PostPage from "./PostPage";
import SignInPage from "./SignInPage";
import UploadPage from "./UploadPage";
import UserPage from "./UserPage";
import MasonryList from "./MasonryList";
import { MasonryInit } from "../components/Masonry";

s;

const app = document.getElementById("app");

function resetApp() {
  while (app.firstChild) {
    app.firstChild.remove();
  }
}

export default function renderPage(page) {
  resetApp();
  switch (page) {
    case "":
      app.append(FrontPage());
      break;
    case "location":
      app.append(MasonryList());
      MasonryInit();
      break;
    case "post":
      app.append(PostPage());
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
