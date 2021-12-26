import el from "../utils/dom";
import Loader from "./Loader";
import Modal from "./Modal";
import { addClickEvent } from "../router";
import { getUserCommentData } from "../api";
import { deleteComment } from "../api/comment";
import EmptyBox from "./EmptyBox";
import imagesLoaded from "../utils/imagesLoaded";
import toast from "../utils/toast";

function UserCommentItem(data: IUserComment) {
  const anchor = el("a", {}, data.title);
  addClickEvent(anchor, `/post/${data.postId}`);

  return el(
    "li",
    { className: "comment-list", id: `comment-${data.commentId}` },
    el(
      "div",
      { className: "comment-list__img" },
      el("img", { src: data.photo }),
    ),
    el(
      "div",
      { className: "comment-list__content" },
      el("p", { className: "comment-list__comment" }, data.comment),
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

                app?.append(
                  Modal({
                    title: "삭제하면 되돌릴 수 없어요!",
                    content: "그래도 삭제하시겠습니까?",
                    callback: async () => {
                      const target = document.getElementById(
                        `comment-${data.commentId}`,
                      );
                      const deleted = await deleteComment(
                        data.postId,
                        data.commentId,
                      );

                      if (target && "success" in deleted) {
                        const container =
                          document.querySelector(".comment-container");

                        target.remove();

                        // No more comments
                        if (container && !container.firstElementChild) {
                          container.append(
                            EmptyBox({
                              message: "아직 내가 쓴 댓글이 없습니다.",
                              icon: "icon-chat_bubble",
                              link: "/",
                              linkMessage: "맛식 보러 가기",
                            }),
                          );
                        }
                      } else {
                        toast("댓글이 삭제되지 않았습니다.");
                      }
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
}

export default function UserPageComment() {
  let page = 1;
  let isDone = false;
  let isLoading = false;
  const id = window.user?.id;
  const container = el("ul", { className: "comment-container" });
  const observeTarget = document.querySelector(".footer");
  const loader = Loader();
  const fetchData = async () => {
    if (isLoading || isDone || !id) return;
    isLoading = true;
    container.append(loader);
    try {
      const list = await getUserCommentData(id, page);
      if ("error" in list) throw new Error("It's empty!");
      const { data, pagination } = list;
      if (!data || !data.length) throw new Error("It's empty!");
      const fragment = el("fragment", {});
      const elements = data.map((list) => UserCommentItem(list));

      if (!pagination.nextPage) {
        isDone = true;
        // eslint-disable-next-line no-use-before-define
        observeTarget && io.unobserve(observeTarget);
      }

      await imagesLoaded(elements, () => {
        page += 1;
        isLoading = false;
      });

      loader.remove();
      elements.forEach((elt: HTMLLIElement) => fragment.append(elt));
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
  observeTarget && io.observe(observeTarget);

  return container;
}
