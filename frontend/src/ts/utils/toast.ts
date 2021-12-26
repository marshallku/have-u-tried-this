import el from "./dom";
import "../../css/toast.css";

export default function toast(str: string) {
  if (typeof str !== "string") {
    console.log(str);
    return;
  }
  document.querySelectorAll(".toast").forEach((elt) => elt.remove());

  document.body.append(
    el(
      "div",
      {
        className: "toast",
        events: {
          animationend: (event: AnimationEvent) => {
            const { target } = event;
            if (target instanceof HTMLElement) {
              target.remove();
            }
          },
        },
      },
      str,
    ),
  );
}
