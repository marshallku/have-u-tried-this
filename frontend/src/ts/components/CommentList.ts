import el from "../utils/dom";
import { getCommentList, postComment, deleteComment } from "../api";
import { formatToReadableTime } from "../utils/time";
import Loader from "./Loader";
import toast from "../utils/toast";
import "../../css/CommentList.css";

function CommentItem(data: IComment, postId: string) {
  const { author } = data;

  return el(
    "li",
    { className: "comment", id: `comment-${data._id}` },
    el(
      "div",
      { className: "comment__avatar" },
      el("img", { src: author.profile }),
    ),
    el(
      "div",
      { className: "comment__content" },
      el("div", { className: "comment__body" }, data.contents),
      el(
        "div",
        { className: "comment__info" },
        el(
          "span",
          { className: "comment__author" },
          `${author.lastName} ${author.firstName}`,
        ),
        el(
          "time",
          { className: "comment__date" },
          formatToReadableTime(data.createdAt),
        ),
        data.author._id === window.user?.id
          ? el(
              "button",
              {
                className: "comment__delete",
                events: {
                  click: async () => {
                    const target = document.getElementById(
                      `comment-${data._id}`,
                    );
                    const deleted = await deleteComment(postId, data._id);

                    if (target && "success" in deleted) {
                      target.remove();
                    } else {
                      toast("댓글이 삭제되지 않았습니다.");
                    }
                  },
                },
              },
              el("i", { className: "icon-delete" }),
            )
          : null,
      ),
    ),
  );
}

function CommentInput(postId: string) {
  const disabled = !window.user?.token;
  const profile = window.user?.profile;
  const textarea = el("textarea", {
    className: "comment-input__text",
    type: "text",
    disabled,
    placeholder: disabled
      ? "로그인 후 이용할 수 있습니다"
      : "댓글을 입력하세요",
  });
  const form = el(
    "form",
    {
      className: "comment-input",
      events: {
        submit: async (event: SubmitEvent) => {
          event.preventDefault();
          const newComment = await postComment(postId, textarea.value);

          if (newComment && !("error" in newComment)) {
            const container = document.querySelector(".comments");
            const newCommentElt = CommentItem(newComment, postId);
            const commentForm = document.querySelector(".comment-input");

            container?.prepend(newCommentElt);

            if (commentForm && commentForm instanceof HTMLFormElement) {
              commentForm.reset();
            }
          } else {
            toast("댓글이 추가되지 않았습니다.");
          }
        },
      },
    },
    el(
      "div",
      { className: "comment-input__profile" },
      el("img", { src: profile }),
    ),
    textarea,
    el(
      "div",
      {},
      el("button", {
        className: "comment-input__submit icon-chat_bubble",
        type: "submit",
        disabled,
      }),
    ),
  );

  return form;
}

export default function CommentList(postId: string) {
  let page = 1;
  let isDone = false;
  let isLoading = false;
  const loader = Loader();
  const loadButton = el("button", {
    className: "icon-add_circle comments-load-more",
  });
  const commentList = el("ul", { className: "comments" });
  const container = el(
    "section",
    { className: "details__comments" },
    commentList,
    loadButton,
    CommentInput(postId),
  );
  const fetchData = async () => {
    if (isLoading || isDone) return;

    container.append(loader);
    isLoading = true;

    try {
      const list = await getCommentList(postId, page);
      if ("error" in list) return container;
      const { comments, pagination } = list;
      const fragment = el("fragment", {});
      const elements = comments.map((x) => CommentItem(x, postId));

      if (!pagination.nextPage) {
        isDone = true;
        loadButton.remove();
      }

      loader.remove();
      elements.forEach((elt) => fragment.append(elt));

      commentList.append(fragment);
      isLoading = false;
      page += 1;
    } catch (err) {
      toast(`${err}`);
    }
  };

  fetchData();
  loadButton.addEventListener("click", fetchData);

  return container;
}
