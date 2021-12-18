import el from "../utils/dom";
import "../../css/Loader.css";

export default function Loader() {
  return el(
    "div",
    { className: "loader" },
    el(
      "div",
      { className: "food" },
      ...["🍔", "🍕", "🌮", "🍰", "🍖", "🧀"].map((x) => el("div", {}, x)),
    ),
    el("div", { className: "pacman" }),
  );
}
