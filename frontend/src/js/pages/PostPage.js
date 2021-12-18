import Carousel from "../components/Carousel";
import LikesCount from "../components/LikesCount";
import Modal from "../components/Modal";
import { fetchPostData } from "../api/dummy";
import "../../css/PostDetails.css";

function renderPostDetails(data) {
  const {
    title,
    author,
    content,
    pictures,
    likes,
    location,
    createdAt,
    updatedAt,
  } = data;
  const frag = document.createDocumentFragment();
  const carousel = Carousel(pictures);
  const smallContainer = document.createElement("div");
  const header = document.createElement("header");
  const locationWrap = document.createElement("div");
  const locationIcon = document.createElement("i");
  const locationText = document.createElement("span");
  const dateWrap = document.createElement("div");
  const dateIcon = document.createElement("i");
  const dateText = document.createElement("span");
  const postDate = new Date(`${updatedAt || createdAt}`);
  const buttonsWrap = document.createElement("div");
  const likesElt = LikesCount("button", likes);
  const titleElt = document.createElement("h2");
  const authorElt = document.createElement("div");
  const authorAvatar = document.createElement("img");
  const authorName = document.createElement("span");
  const descElt = document.createElement("p");
  const editing = {
    status: false,
    title: "",
    desc: "",
  };

  // Location
  locationWrap.classList.add("details__location");
  locationIcon.classList.add("icon-location_on");
  locationText.innerText = `${location.wideAddr} ${location.localAddr}`;
  locationWrap.append(locationIcon, locationText);

  // Date
  dateWrap.classList.add("details__date");
  dateIcon.classList.add("icon-calendar_today");
  dateText.innerText = postDate.toLocaleDateString("ko-KR");
  dateWrap.append(dateIcon, dateText);

  // Buttons
  likesElt.classList.add("details__rate");
  buttonsWrap.classList.add("details__buttons");
  buttonsWrap.append(likesElt);
  if (data.isAuthor) {
    // Edit
    const edit = document.createElement("button");

    edit.classList.add("icon-create");
    edit.addEventListener("click", () => {
      const nextStatus = !editing.status;

      titleElt.contentEditable = nextStatus;
      descElt.contentEditable = nextStatus;

      if (editing.status) {
        // End editing
        edit.className = "icon-create";
        // Remove Attributes
        titleElt.removeAttribute("role");
        titleElt.classList.remove("details__title--editing");
        descElt.removeAttribute("role");
        descElt.classList.remove("details__desc--editing");

        // Fill Text if empty
        if (!titleElt.innerText) titleElt.innerText = editing.title;
        if (!descElt.innerText) descElt.innerText = editing.desc;

        // Validate text
        if (titleElt.innerText.includes("\n"))
          titleElt.innerText = titleElt.innerText.replaceAll("\n", " ");

        // TODO: Update post with api
      } else {
        // Start editing
        edit.className = "icon-save";
        editing.title = titleElt.innerText;
        editing.desc = descElt.innerText;
        titleElt.setAttribute("role", "textbox");
        titleElt.classList.add("details__title--editing");
        descElt.setAttribute("role", "textbox");
        descElt.classList.add("details__desc--editing");
        titleElt.focus();
      }

      editing.status = nextStatus;
    });

    // Delete
    const del = document.createElement("button");

    del.classList.add("icon-clear");
    del.addEventListener("click", () => {
      const app = document.getElementById("app");
      app.append(Modal(author, content));
    });

    buttonsWrap.append(edit, del);
  }

  // Title
  titleElt.classList.add("details__title");
  titleElt.innerText = title;

  // Author
  authorElt.classList.add("details__author");
  authorAvatar.src = author.profile;
  authorName.innerText = `by ${author.nickname}`;
  authorElt.append(authorAvatar, authorName);

  // Append above to header
  header.classList.add("details__header");
  header.append(dateWrap, locationWrap, buttonsWrap, titleElt, authorElt);

  // desc
  descElt.classList.add("details__desc");
  descElt.innerText = content;

  // Container
  smallContainer.classList.add("small-container", "details");
  smallContainer.append(header, descElt);
  frag.append(carousel, smallContainer);

  return frag;
}

export default function PostDetails() {
  const article = document.createElement("article");

  fetchPostData().then((data) => {
    article.append(renderPostDetails(data));
  });

  return article;
}
