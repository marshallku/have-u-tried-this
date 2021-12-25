import el from "../utils/dom";
import { pick } from "../utils/array";
import "../../css/Loader.css";

export default function Loader() {
  const foods = [
    "🍔",
    "🍕",
    "🌮",
    "🍰",
    "🍖",
    "🧀",
    "🍋",
    "🍎",
    "🥝",
    "🍅",
    "🧇",
    "🥨",
    "🥐",
    "🥩",
    "🥓",
    "🍗",
    "🍨",
    "🧆",
  ];
  const randomFoods = () => pick(foods, 6, true).map((x) => el("div", {}, x));

  return el(
    "div",
    { className: "loader" },
    el(
      "div",
      {
        className: "food",
        events: {
          animationiteration: (event: AnimationEvent) => {
            const { target } = event;
            if (!target || !(target instanceof HTMLElement)) return;
            const fragment = document.createDocumentFragment();
            randomFoods().forEach((elt) => fragment.append(elt));
            // eslint-disable-next-line no-param-reassign
            target.innerHTML = "";
            target.append(fragment);
          },
        },
      },
      ...randomFoods(),
    ),
    el("div", { className: "pacman" }),
  );
}
