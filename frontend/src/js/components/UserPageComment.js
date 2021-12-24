import el from "../utils/dom";
import Loader from "./Loader";
import imagesLoaded from "../utils/imagesLoaded";
import Modal from "./Modal";
import { addClickEvent } from "../router";
import { getUserCommentData } from "../api";
import { deleteComment } from "../api/comment";
import EmptyBox from "./EmptyBox";

export default function UserPageComment() {
  let page = 1;
  let isDone = false;
  let isLoading = false;
  const { id } = window.user;
  const container = el("ul", { className: "comment-container" });
  const observeTarget = document.querySelector(".footer");
  const loader = Loader();

  const userComment = (list) => {
    const anchor = el("a", {}, list.title);
    addClickEvent(anchor, `/post/${list.postId}`);

    return el(
      "li",
      { className: "comment-list" },
      el(
        "div",
        { className: "comment-list__img" },
        el("img", { src: list.photo }),
      ),
      el(
        "div",
        { className: "comment-list__content" },
        el("p", { className: "comment-list__comment" }, list.comment),
        el(
          "div",
          {},
          el(
            "div",
            { className: "comment-list__title" },
            el("p", {}, "게시글 제목:"),
            anchor,
          ),
          el(
            "button",
            {
              className: "comment-list__del",
              events: {
                click: () => {
                  const app = document.getElementById("app");
                  app.append(
                    Modal({
                      title: "삭제하면 되돌릴 수 없어요!",
                      content: "그래도 삭제하시겠습니까?",
                      callback: async () => {
                        await deleteComment(list.postId, list.commentId);
                      },
                    }),
                  );
                },
              },
            },
            "삭제",
          ),
        ),
      ),
    );
  };

  const fetchData = async () => {
    if (isLoading || isDone) return;
    isLoading = true;
    container.append(loader);
    try {
      const { data, pagination, error } = await getUserCommentData(id, page);
      if (!data || error || !data.length) throw new Error("It's empty!");
      const fragment = el("fragment", {});
      const elements = data.map((list) => userComment(list));

      if (!pagination.nextPage) {
        isDone = true;
        // eslint-disable-next-line no-use-before-define
        io.unobserve(observeTarget);
      }

      await imagesLoaded(elements, () => {
        page += 1;
        isLoading = false;
      });

      loader.remove();
      elements.forEach((elt) => fragment.append(elt));
      container.append(fragment);
    } catch (err) {
      loader.remove();
      container.append(
        EmptyBox({
          message: "아직 내가 쓴 댓글이 없습니다.",
          icon: "icon-chat_bubble",
          link: "/",
          linkMessage: "맛식 보러 가기",
        }),
      );
    }
  };

  const io = new IntersectionObserver(() => fetchData());

  fetchData();
  io.observe(observeTarget);

  return container;
}
