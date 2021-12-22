import el from "./dom";
import "../../css/toast.css";

export default function toast(str) {
  document.querySelectorAll(".toast").forEach((elt) => elt.remove());

  document.body.append(
    el(
      "div",
      {
        className: "toast",
        events: {
          animationend: (event) => event.target.remove(),
        },
      },
      str,
    ),
  );
}
