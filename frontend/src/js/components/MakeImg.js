import "../../css/MakeImg.css";

export default function MakeImg(e){
  const img = document.createElement("img");
  img.classList.add("imgStyle");
  img.src = e.target.result;
  return img;
}