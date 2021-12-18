import InfiniteScroll from "./InfiniteScroll";
import MasonryList from "../pages/MasonryList";
import { debounce } from "../utils/optimize";

let imgStack;

export function MasonryInit() {
  if (window.innerWidth >= 860) {
    imgStack = [0, 0, 0];
  } else if (window.innerWidth >= 600) {
    imgStack = [0, 0];
  } else {
    imgStack = [0];
  }
}

function updateScreenSize() {
  if (window.location.pathname.split("/")[1] !== "location") return;
  const app = document.getElementById("app");
  MasonryInit();
  app.append(MasonryList("resize"));
}

window.addEventListener(
  "resize",
  debounce(() => updateScreenSize(), 400),
);

export default function Masonry(e) {
  const { width, height } = e.target;
  const item = e.path[3];
  const idx = parseInt(item.className, 10);
  const container = document.querySelector(".masonry-container");

  if (idx === 10) {
    InfiniteScroll(item);
  }

  item.style.width = `${width}px`;
  item.style.position = "absolute";
  const x = (width + 20) * (idx % imgStack.length);
  const y = imgStack[idx % imgStack.length];
  imgStack[idx % imgStack.length] += height + 20;
  item.style.transform = `translateX(${x}px) translateY(${y}px)`;
  container.style.height = `${Math.max(...imgStack)}px`;
  item.style.visibility = "visible";
}
