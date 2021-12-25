import { addLike, removeLike } from "../api";
import "../../css/LikesCount.css";

export default function LikesCount({
  type,
  likes,
  liked,
  postId,
}: {
  type: "button" | "div";
  likes: number;
  liked: boolean;
  postId?: string;
}) {
  const likesButton = document.createElement(type);
  const icon = document.createElement("i");
  const likesElt = document.createTextNode(`${likes}`);

  likesButton.classList.add("likes");

  if (type === "button")
    likesButton.addEventListener("click", async () => {
      if (!postId) return;
      const currentLiked = parseInt(likesElt?.textContent || "0", 10);
      const isLiked = icon.classList.contains("icon-favorite");
      const response = isLiked
        ? await removeLike(postId)
        : await addLike(postId);

      if (!response || "error" in response) return;

      const postItem = document
        .querySelector(`a[href$="${postId}"]`)
        ?.querySelector(".likes");
      const postItemText = postItem?.lastChild;

      icon.classList.toggle("icon-favorite");
      icon.classList.toggle("icon-favorite_outline");

      if (postItem) {
        postItem.querySelector("i")?.classList.toggle("icon-favorite");
        postItem.querySelector("i")?.classList.toggle("icon-favorite_outline");
      }

      if (isLiked) {
        likesElt.textContent = `${currentLiked - 1}`;
        if (postItem && postItemText) {
          postItemText.textContent = `${currentLiked - 1} `;
        }
      } else {
        likesElt.textContent = `${currentLiked + 1}`;
        if (postItem && postItemText) {
          postItemText.textContent = `${currentLiked + 1} `;
        }
      }
    });

  icon.classList.add(`icon-favorite${liked ? "" : "_outline"}`);

  likesButton.append(icon, likesElt);

  return likesButton;
}
