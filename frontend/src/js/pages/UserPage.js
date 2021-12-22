import el from "../utils/dom";
import UserPagePost from "../components/UserPagePost";
import UserPageLike from "../components/UserPageLike";
import { customRouter } from "../router";
import "../../css/userPage.css";

function Drawer(userPageRouter) {
  const Button = ({ text, path }) => {
    const a = el(
      "a",
      { className: "nav__item" },
      el("i", { className: "icon-utensil-spoon-solid" }),
      text,
    );

    userPageRouter.addNavigator(a, path);

    return el("li", {}, a);
  };

  return el(
    "nav",
    { className: "nav" },
    el(
      "ul",
      { className: "nav__items" },
      Button({
        text: "작성 글",
        path: "/",
      }),
      Button({
        text: "추천한 글",
        path: "/liked",
      }),
    ),
  );
}

export default function UserPage() {
  const userPageRouter = customRouter();
  userPageRouter.base = "user";
  userPageRouter.routes = {
    "/": UserPagePost,
    "/liked": UserPageLike,
  };

  const drawer = Drawer(userPageRouter);
  const main = el("main", { className: "settings" });

  userPageRouter.baseElement = main;
  userPageRouter.initialize(window.location.pathname.replace("user", ""));

  return el("fragment", {}, drawer, main);
}
