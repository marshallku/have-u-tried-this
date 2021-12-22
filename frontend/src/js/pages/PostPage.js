import el from "../utils/dom";
import Carousel from "../components/Carousel";
import LikesCount from "../components/LikesCount";
import Modal from "../components/Modal";
import { fetchPostData } from "../api";
import Loader from "../components/Loader";
import { addClickEvent } from "../router";
import { formatToReadableTime } from "../utils/time";
import { removeBackSpace, removeLineBreak } from "../utils/string";
import { getPaths } from "../utils/location";
import "../../css/PostDetails.css";

function renderPostDetails(data) {
  const {
    title,
    author,
    content,
    photos,
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
      const inputtedTitle = removeBackSpace(
        removeLineBreak(titleElt.innerText.trim() || editing.title),
      );
      const inputtedDesc = removeLineBreak(
        descElt.innerText.trim() || editing.desc,
      );

      // End editing
      target.className = "icon-create";
      // Remove Attributes
      titleElt.removeAttribute("role");
      titleElt.classList.remove("details__title--editing");
      descElt.removeAttribute("role");
      descElt.classList.remove("details__desc--editing");

      // Fill text with valid string
      titleElt.innerText = inputtedTitle;
      descElt.innerText = inputtedDesc;

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
  const editButtons = data.isAuthor
    ? [
        el("button", {
          events: {
            click: handleEditButtonClick,
          },
          className: "icon-create",
        }),
        el("button", {
          events: {
            click: () => {
              const app = document.getElementById("app");
              app.append(Modal(author, content));
            },
          },
          className: "icon-delete",
        }),
      ]
    : [];

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
    el(
      "nav",
      { className: "details-nav" },
      el(
        "button",
        {
          events: {
            click: [() => window.history.back(), { once: true }],
          },
        },
        el("i", {
          className: "icon-arrow_forward_ios",
        }),
      ),
    ),
    Carousel(photos),
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
        el("div", { className: "details__buttons" }, likesElt, ...editButtons),
        titleElt,
        el(
          "div",
          { className: "details__author" },
          el("img", { src: author.profile }),
          el("span", {}, `by ${author.lastName} ${author.firstName}`),
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
  const postId = getPaths().pop();

  fetchPostData(postId).then((data) => {
    loader.remove();
    article.append(renderPostDetails(data, fixed));
  });

  return container;
}
