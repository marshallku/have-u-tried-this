import el from "../utils/dom";
import Carousel from "../components/Carousel";
import LikesCount from "../components/LikesCount";
import Modal from "../components/Modal";
import { fetchPostData } from "../api";
import Loader from "../components/Loader";
import { addClickEvent } from "../router";
import { formatToReadableTime } from "../utils/time";
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
  const locationAnchor = el(
    "a",
    {},
    `${location.wideAddr} ${location.localAddr}`,
  );
  const likesElt = LikesCount("button", likes);
  const titleElt = el("h2", { className: "details__title" }, title);
  const descElt = el("p", { className: "details__desc" }, content);
  const editing = {
    status: false,
    title: "",
    desc: "",
  };
  const handleEditButtonClick = (event) => {
    const { target } = event;
    const nextStatus = !editing.status;

    titleElt.contentEditable = nextStatus;
    descElt.contentEditable = nextStatus;

    if (editing.status) {
      // End editing
      target.className = "icon-create";
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
      target.className = "icon-save";
      editing.title = titleElt.innerText;
      editing.desc = descElt.innerText;
      titleElt.setAttribute("role", "textbox");
      titleElt.classList.add("details__title--editing");
      descElt.setAttribute("role", "textbox");
      descElt.classList.add("details__desc--editing");
      titleElt.focus();
    }

    editing.status = nextStatus;
  };

  // Location
  addClickEvent(
    locationAnchor,
    `/location/${location.wideAddr}/${location.localAddr}`,
  );

  // Buttons
  likesElt.classList.add("details__rate");

  return el(
    "fragment",
    {},
    Carousel(pictures),
    el(
      "div",
      { className: "small-container details" },
      el(
        "header",
        { className: "details__header" },
        el(
          "div",
          { className: "details__date" },
          el("i", { className: "icon-calendar_today" }),
          el(
            "time",
            { dateTime: `${updatedAt || createdAt}` },
            formatToReadableTime(`${updatedAt || createdAt}`),
          ),
        ),
        el(
          "div",
          { className: "details__location" },
          el("i", { className: "icon-location_on" }, locationAnchor),
        ),
        el(
          "div",
          { className: "details__buttons" },
          likesElt,
          data.isAuthor &&
            el("button", {
              events: {
                click: handleEditButtonClick,
              },
              className: "icon-create",
            }),
          data.isAuthor &&
            el("button", {
              events: {
                click: () => {
                  const app = document.getElementById("app");
                  app.append(Modal(author, content));
                },
              },
              className: "icon-clear",
            }),
        ),
        titleElt,
        el(
          "div",
          { className: "details__author" },
          el("img", { src: author.profile }),
          el("span", {}, `by ${author.nickname}`),
        ),
      ),
      descElt,
    ),
  );
}

export default function PostDetails(fixed) {
  const loader = Loader();
  const article = el("article", {});
  const container = el(
    "div",
    {
      className: fixed ? "fixed-container" : "",
      events: {
        click: fixed
          ? (event) => {
              if (event.target === container) window.history.back();
            }
          : null,
      },
    },
    loader,
    article,
  );

  fetchPostData().then((data) => {
    loader.remove();
    article.append(renderPostDetails(data, fixed));
  });

  return container;
}
