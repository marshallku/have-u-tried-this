import el from "../utils/dom";
import Loader from "./Loader";
import "../../css/ErrorComponent.css";

export default function ErrorComponent() {
  return el(
    "div",
    { className: "error" },
    el("h1", { className: "error__title" }, "오류가 발생했습니다!"),
    Loader(),
    el(
      "a",
      { href: "/", className: "error__link" },
      el("i", { className: "icon-home" }),
    ),
  );
}
