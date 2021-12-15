import Carousel from "../components/Carousel";
import LikesCount from "../components/LikesCount";
import "../../css/PostDetails.css";

export default function PostDetails(data) {
  const frag = document.createDocumentFragment();
  const carousel = Carousel(data.pictures);
  const smallContainer = document.createElement("section");
  const likes = LikesCount(data.likes);
  const title = document.createElement("h2");
  const author = document.createElement("div");
  const authorAvatar = document.createElement("img");
  const authorName = document.createElement("span");
  const desc = document.createElement("p");

  // Rate
  likes.classList.add("details__rate");

  // Title
  title.classList.add("details__title");
  title.innerText = data.title;

  // Author
  author.classList.add("details__author");
  authorName.innerText = `by ${data.author.nickname}`;
  author.append(authorName);

  // desc
  desc.classList.add("details__text");
  desc.innerText = data.content;

  // Container
  smallContainer.classList.add("small-container", "details");
  smallContainer.append(likes, title, author, desc);
  frag.append(carousel, smallContainer);

  return frag;
}
