export default function imagesLoaded(elements, func) {
  const images = elements
    .map((element) => [...element.querySelectorAll("img")])
    .filter((x) => x.length)
    .reduce((acc, cur) => acc.concat(cur), []);
  const imagesLength = images.length;
  let loaded = 0;
  const tryCallback = () => {
    loaded += 1;
    if (imagesLength === loaded) func();
  };

  images.forEach((img) => {
    img.addEventListener("load", tryCallback, { once: true });
  });

  return elements;
}
