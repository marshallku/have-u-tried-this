import el from "../utils/dom";
import { addClickEvent } from "../router";
import "../../css/EmptyBox.css";

export default function EmptyBox({ message, icon, link, linkMessage }) {
  const anchor = (text, path) => {
    const a = el("a", {}, text);
    addClickEvent(a, path);

    return a;
  };

  return el(
    "div",
    { className: "emptyBox" },
    el(
      "div",
      { className: "emptyBox__content" },
      el("i", { className: icon }),
      el("div", {}, message),
      anchor(linkMessage, link),
    ),
  );
}
