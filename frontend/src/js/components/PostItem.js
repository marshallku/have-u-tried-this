import LikesCount from "./LikesCount";
import "../../css/PostItem.css";

export default function PostItem({ title, thumbnail, location, slug, likes }) {
  const article = document.createElement("article");
  const anchor = document.createElement("a");
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const header = document.createElement("header");
  const titleElt = document.createElement("h2");
  const articleInfo = document.createElement("div");
  const locationElt = document.createElement("div");
  const likesContainer = LikesCount(likes);

  // Article
  article.classList.add("post-item");
  anchor.href = `/posts/${slug}`;

  // Thumbnail
  figure.classList.add("post-item__thumbnail");
  img.src = thumbnail;
  figure.append(img);

  // Header
  header.classList.add("post-item__header");
  // Title
  titleElt.classList.add("post-item__title");
  titleElt.innerText = title;
  // Info
  articleInfo.classList.add("post-item__info");
  if (location) {
    locationElt.classList.add("post-item__location");
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
