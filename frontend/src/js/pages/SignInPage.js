import el from "../utils/dom";
import { addClickEvent } from "../router";
import "../../css/SignInPage.css";

export default function SignInPage() {
  const signInButton = el(
    "button",
    {
      className: "sign-in__button",
    },
    el("img", { src: "/static/images/google.svg" }),
    el("span", {}, "Google 계정으로 로그인"),
  );

  addClickEvent(signInButton, "/user");

  return el(
    "div",
    { className: "sign-in" },
    el(
      "div",
      { className: "sign-in__logo" },
      el("img", { src: "/static/images/logo.svg" }),
    ),
    el(
      "div",
      { className: "sign-in__container" },
      el("h2", { className: "sign-in__title" }, "로그인"),
      el(
        "p",
        { className: "sign-in__info" },
        "구글로 간편하게 로그인 하고 맛식 저장, 공유 하세요!",
      ),
      signInButton,
    ),
  );
}
