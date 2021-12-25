export default function imagesLoaded(
  elements: HTMLElement[],
  func: () => void,
) {
  return new Promise((res) => {
    const images = elements
      .map((element) => [...element.querySelectorAll("img")])
      .filter((x) => x.length)
      .reduce((acc, cur) => acc.concat(cur), []);
    const imagesLength = images.length;
    let loaded = 0;
    const tryCallback = () => {
      loaded += 1;
      if (imagesLength === loaded) res(func());
    };

    images.forEach((img) => {
      img.addEventListener("load", tryCallback, { once: true });
    });
  });
}
