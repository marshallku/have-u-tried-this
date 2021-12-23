import el from "../utils/dom";
import "../../css/SignInPage.css";

export default function SignInPage() {
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
      el(
        "a",
        {
          className: "sign-in__button",
          href: "https://elice-kdt-sw-1st-vm02.koreacentral.cloudapp.azure.com/api/auth/google",
        },
        el("img", { src: "/static/images/google.svg" }),
        el("span", {}, "Google 계정으로 로그인"),
      ),
    ),
  );
}
