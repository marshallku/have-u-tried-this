import el from "../utils/dom";
import UserPagePost from "../components/UserPagePost";
import UserPageLike from "../components/UserPageLike";
import UserPageComment from "../components/UserPageComment";
import { customRouter } from "../router";
import "../../css/userPage.css";

function Drawer(userPageRouter: ICustomRouter) {
  const Button = ({ text, path }: { text: string; path: string }) => {
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
      Button({
        text: "작성 댓글",
        path: "/comment",
      }),
    ),
  );
}

export default function UserPage() {
  const isMain = window.location.pathname === "/user";
  const userPageRouter = customRouter();
  userPageRouter.base = "user";
  userPageRouter.routes = {
    "/": UserPagePost,
    "/liked": UserPageLike,
    "/comment": UserPageComment,
  };

  const drawer = Drawer(userPageRouter);
  const main = el("main", { className: "settings" });

  userPageRouter.baseElement = main;
  userPageRouter.initialize(
    window.location.pathname.replace("/user", isMain ? "/" : ""),
  );

  return el("fragment", {}, drawer, main);
}
