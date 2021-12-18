export default function imagesLoaded(elements, func) {
  const images = [];
  let loaded = 0;
  const tryCallback = () => {
    loaded += 1;
    if (images.length === loaded) func();
  };

  elements.forEach((element) => {
    element.querySelectorAll("img").forEach((img) => {
      images.push(img);
    });
  });

  images.forEach((img) => {
    img.addEventListener("load", tryCallback, { once: true });
  });

  return elements;
}
