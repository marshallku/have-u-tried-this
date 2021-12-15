import "../../css/MakeDiv.css";

export default function makeDiv(img) {
  const div = document.createElement("div");
  div.classList.add("divStyle");
  div.appendChild(img);
  return div;
}
