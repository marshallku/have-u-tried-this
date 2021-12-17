import "../../css/LikesCount.css";

export default function LikesCount(number) {
  const likesContainer = document.createElement("div");
  const icon = document.createElement("i");
  const likesElt = document.createTextNode(`${number}`);

  likesContainer.classList.add("likes");
  likesContainer.addEventListener("click", () => {
    // TODO: api 통신 추가
    const currentLiked = parseInt(likesElt.textContent, 10);
    const liked = icon.classList.toggle("icon-favorite");
    icon.classList.toggle("icon-favorite_outline");

    if (liked) {
      likesElt.textContent = `${currentLiked + 1}`;
    } else {
      likesElt.textContent = `${currentLiked - 1}`;
    }
  });

  // TODO: 좋아한 게시글인지 확인해서 class 추가
  icon.classList.add("icon-favorite_outline");

  likesContainer.append(icon, likesElt);

  return likesContainer;
}
