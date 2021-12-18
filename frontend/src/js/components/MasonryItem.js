import LikesCount from "./LikesCount";
import Masonry from "./Masonry";
import { addClickEvent } from "../router";

export default function MasonryItem({
  key,
  title,
  photo,
  location,
  slug,
  likes,
}) {
  const article = document.createElement("article");
  const anchor = document.createElement("a");
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const header = document.createElement("header");
  const titleElt = document.createElement("h2");
  const articleInfo = document.createElement("div");
  const locationElt = document.createElement("div");
  const likesContainer = LikesCount(likes);
  const to = `/post/${slug}`;

  // Article
  article.classList.add(key, "masonry-item");
  article.style.visibility = "hidden";
  addClickEvent(anchor, to);

  // Img
  figure.classList.add("masonry-item__thumbnail");
  img.src = photo;
  figure.append(img);
  img.addEventListener("load", (e) => Masonry(e));

  // Header
  header.classList.add("masonry-item__header");

  // Title
  titleElt.classList.add("masonry-item__title");
  titleElt.innerText = title;

  // Info
  articleInfo.classList.add("masonry-item__info");
  if (location) {
    locationElt.innerText = location;
    articleInfo.append(locationElt);
  }
  articleInfo.append(likesContainer);
  header.append(titleElt, articleInfo);

  // Append
  anchor.append(figure, header);
  article.append(anchor);

  return article;
}
