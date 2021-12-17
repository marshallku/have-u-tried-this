import UserPageInfo from "../components/UserPageInfo";
import UserPagePost from "../components/UserPagePost";
import UserPageComment from "../components/UserPageComment";
import UserPageLike from "../components/UserPageLike";
import { customRouter } from "../router";
import "../../css/userPage.css";

function Drawer(userPageRouter) {
  const nav = document.createElement("nav");
  const Button = ({ text, path }) => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.classList.add("nav__item");
    a.innerText = text;
    userPageRouter.addNavigator(a, path);

    li.append(a);

    return li;
  };
  const ul = document.createElement("ul");
  const post = Button({
    text: "작성 글",
    path: "/",
  });
  const comment = Button({
    text: "작성 댓글",
    path: "/comment",
  });
  const liked = Button({
    text: "추천한 글",
    path: "/liked",
  });

  // Nav
  nav.classList.add("nav");

  // List items
  ul.classList.add("nav__items");
  ul.append(post, comment, liked);

  // Append
  nav.append(ul);

  return nav;
}

export default function UserPage() {
  const userPageRouter = customRouter();
  userPageRouter.base = "user";
  userPageRouter.routes = {
    "/": UserPagePost,
    "/comment": UserPageComment,
    "/liked": UserPageLike,
  };

  const fragment = document.createDocumentFragment();
  const drawer = Drawer(userPageRouter);
  const main = document.createElement("main");

  userPageRouter.baseElement = main;
  userPageRouter.initialize(window.location.pathname.replace("user", ""));

  main.classList.add("settings");
  fragment.append(drawer, main);

  return fragment;
}
