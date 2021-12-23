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
      el("div", {}, el("h2", {}, local), el("h3", {}, wide)),
    ),
    el(
      "span",
      { className: "city-item__button" },
      el("span", {}, "더보기"),
      el("i", { className: "icon-arrow_forward_ios" }),
    ),
  );

  // Article
  addClickEvent(anchor, `/location/${wide}/${local}`);

  return el("article", { className: "city-item" }, anchor);
}
