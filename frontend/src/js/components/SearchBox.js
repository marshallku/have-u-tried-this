import el from "../utils/dom";
import "../../css/SearchBox.css";

export default function SearchBox() {
  return el(
    "section",
    { className: "input-box" },
    el(
      "div",
      { className: "input-box__container" },
      el("input", {
        className: "input-box__input",
        type: "text",
        placeholder: "지역을 입력해보세요!",
      }),
    ),
  );
}
