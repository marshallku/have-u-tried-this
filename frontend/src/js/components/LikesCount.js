export default function LikesCount(number) {
  const likesContainer = document.createElement("div");
  const icon = document.createElement("span");
  const likesElt = document.createElement("span");

  icon.innerText = "💜 ";
  likesElt.innerText = number;

  likesContainer.append(icon, likesElt);

  return likesContainer;
}
