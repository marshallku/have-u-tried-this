import el from "../utils/dom";
import Carousel from "../components/Carousel";
import LikesCount from "../components/LikesCount";
import Modal from "../components/Modal";
import CommentList from "../components/CommentList";
import { getPostData } from "../api";
import Loader from "../components/Loader";
import { addClickEvent } from "../router";
import { deletePost, editPostData } from "../api/post";
import { formatToReadableTime } from "../utils/time";
import { removeBackSpace, removeLineBreak } from "../utils/string";
import { getPaths } from "../utils/location";
import "../../css/PostDetails.css";

function renderPostDetails(data) {
  const {
    _id,
    title,
    author,
    contents,
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
  const descElt = el("p", { className: "details__desc" }, contents);
  const editing = {
    status: false,
    title: "",
    desc: "",
  };
  const handleEditButtonClick = async (event) => {
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

      const edited = await editPostData(data._id, {
        title: inputtedTitle,
        contents: inputtedDesc,
      });

      if (edited && !edited.error) {
        // Fill text with valid string
        titleElt.innerText = inputtedTitle;
        descElt.innerText = inputtedDesc;

        // Update list item
        const element = document
          .querySelector(`a[href$="${data._id}"]`)
          ?.querySelector(".post-item__title");

        if (element) {
          element.innerText = inputtedTitle;
          window.handleResize();
        }
      }
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
  const editButtons =
    data.author._id === window.user.id
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
                app.append(
                  Modal({
                    title: "삭제하면 되돌릴 수 없어요!",
                    content: "그래도 삭제하시겠습니까?",
                    callback: async () => {
                      const deleted = await deletePost(data._id);

                      if (deleted && !deleted.error) {
                        window.history.back();
                        // Remove list item
                        const element = document.querySelector(
                          `a[href$="${data._id}"]`,
                        )?.parentElement;

                        if (element) {
                          element.remove();
                          window.handleResize();
                        }
                      }
                    },
                  }),
                );
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
      CommentList(_id),
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

  getPostData(postId).then((data) => {
    loader.remove();
    article.append(renderPostDetails(data, fixed));
  });

  return container;
}
