import el from "../utils/dom";
import { getImages } from "../api";
import { pickRandom } from "../utils/array";
import { getRandomNumber } from "../utils/number";
import "../../css/ImageSlide.css";

export default function ImageSlide() {
  const container = el("div", { className: "image-slide" });
  const getNewImages = async () => {
    const images = await getImages();
    return images;
  };
  let images;
  const transitions = ["ease", "ease-in", "ease-out", "ease-in-out", "linear"];
  const ImageElt = (src) => {
    const { innerWidth, innerHeight } = window;
    const animationAverage = innerWidth / 100;
    const heightAverage = innerHeight / 5;
    const height = getRandomNumber(heightAverage / 2, heightAverage * 2);
    const img = document.createElement("img");

    img.addEventListener("animationend", () => img.remove(), { once: true });

    img.src = src;
    img.height = height;
    img.style.top = `${getRandomNumber(0, innerHeight - height)}px`;
    img.style.animation = `slide ${getRandomNumber(
      animationAverage / 5,
      animationAverage * 5,
    )}s ${pickRandom(transitions)} forwards`;
    img.style.zIndex = `${getRandomNumber(0, 10)}`;
    img.style.borderRadius = `${getRandomNumber(0, 50)}%`;
    img.style.opacity = `${getRandomNumber(0, 100) / 100}`;

    return img;
  };
  let imageEltGenerator;
  const io = new IntersectionObserver((entries) => {
    const [currentContainer] = entries;

    if (currentContainer.isIntersecting) {
      imageEltGenerator = setInterval(() => {
        container.append(ImageElt(pickRandom(images)));
      }, 1000);
    } else {
      clearInterval(imageEltGenerator);
    }
  });

  window.addEventListener("load", () => {
    getNewImages().then((arr) => {
      images = arr;
      io.observe(container);
    });
  });

  return container;
}
