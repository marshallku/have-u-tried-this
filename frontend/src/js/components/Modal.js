import el from "../utils/dom";
import "../../css/Modal.css";
import { unlock } from "../router/lock";

function checkType(data) {
  if (data) {
    console.log(data); // delete data (author, content)
  } else {
    unlock();
  }
}

export default function Modal({ title, content, callback }) {
  const app = document.getElementById("app");
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
          el("div", {}, title),
          el("div", {}, content),
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
            {
              events: {
                click: callback,
              },
            },
            "네, 해주세요",
          ),
        ),
      ),
    ),
  );

  app.append(backdrop);
}
