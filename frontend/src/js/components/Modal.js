import el from "../utils/dom";
import "../../css/Modal.css";

export default function Modal(author, content) {
  const backdrop = el("div", {
    className: "backdrop",
    events: { click: () => backdrop.remove() },
  });

  backdrop.append(
    el(
      "div",
      { className: "modal" },
      el(
        "div",
        { className: "modal__content" },
        el(
          "div",
          { className: "modal__title" },
          el("div", {}, "삭제하면 되돌릴 수 없어요!"),
          el("div", {}, "그래도 삭제하시겠습니까?"),
        ),
        el(
          "div",
          { className: "modal__button" },
          el(
            "button",
            { events: { click: () => backdrop.remove() } },
            "아니요, 안할래요",
          ),
          el(
            "button",
            { events: { click: () => console.log(author, content) } },
            "네, 삭제할게요",
          ),
        ),
      ),
    ),
  );

  return backdrop;
}
