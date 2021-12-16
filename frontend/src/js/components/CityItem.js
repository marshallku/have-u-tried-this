import { addClickEvent } from "../router";
import "../../css/CityItem.css";

export default function CityItem({ wide, local, thumbnail }) {
  const article = document.createElement("article");
  const anchor = document.createElement("a");
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const header = document.createElement("header");
  const wideLocation = document.createElement("h2");
  const localLocation = document.createElement("h3");

  // Article
  article.classList.add("city-item");
  addClickEvent(anchor, `/location/${wide}/${local}`);

  // Thumbnail
  figure.classList.add("city-item__thumbnail");
  img.src = thumbnail;
  figure.append(img);

  // Header
  header.classList.add("city-item__header");
  wideLocation.innerText = wide;
  localLocation.innerText = local;
  header.append(wideLocation, localLocation);

  // Append
  anchor.append(figure, header);
  article.append(anchor);

  return article;
}
