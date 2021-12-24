import { addLike, removeLike } from "../api";
import "../../css/LikesCount.css";

export default function LikesCount({ type, likes, postId }) {
  const likesButton = document.createElement(type);
  const icon = document.createElement("i");
  const likesElt = document.createTextNode(`${likes}`);

  likesButton.classList.add("likes");

  if (type === "button")
    likesButton.addEventListener("click", async () => {
      if (!postId) return;
      const currentLiked = parseInt(likesElt.textContent, 10);
      const liked = icon.classList.contains("icon-favorite");
      const response = liked ? await removeLike(postId) : await addLike(postId);

      if (!response || response.error) return;

      icon.classList.toggle("icon-favorite");
      icon.classList.toggle("icon-favorite_outline");

      if (liked) {
        likesElt.textContent = `${currentLiked - 1}`;
      } else {
        likesElt.textContent = `${currentLiked + 1}`;
      }
    });

  // TODO: 좋아한 게시글인지 확인해서 class 추가
  icon.classList.add("icon-favorite_outline");

  likesButton.append(icon, likesElt);

  return likesButton;
}
