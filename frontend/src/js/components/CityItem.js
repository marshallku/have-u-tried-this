import el from "../utils/dom";
import { addClickEvent } from "../router";
import "../../css/CityItem.css";

export default function CityItem({ wide, local, thumbnail }) {
  const anchor = el(
    "a",
    {},
    el(
      "figure",
      { className: "city-item__thumbnail" },
      el("img", { src: thumbnail }),
    ),
    el(
      "header",
      { className: "city-item__header" },
      el("h2", {}, wide),
      el("h3", {}, local),
    ),
  );

  // Article
  addClickEvent(anchor, `/location/${wide}/${local}`);

  return el("article", { className: "city-item" }, anchor);
}
