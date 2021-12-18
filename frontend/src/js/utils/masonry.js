/* eslint-disable no-param-reassign */
export default function masonry({ container, selector, elements }) {
  const m = {};
  let stack = [];
  let itemWidth;

  const calculate = (elt) => {
    const min = Math.min(...stack);
    const currentPosition = stack.indexOf(min);
    const xGap = currentPosition === 0 ? 0 : 20;
    const yGap = min === 0 ? 0 : 20;
    const x = currentPosition * itemWidth + xGap * currentPosition;
    const y = min === 0 ? 0 : min + yGap;
    const height = elt.querySelector("img").offsetHeight;

    elt.style.position = "absolute";
    elt.style.left = `${x + 10}px`;
    elt.style.top = `${y}px`;
    elt.style.width = `${itemWidth}px`;
    elt.style.height = `${height}px`;
    stack[currentPosition] += height + yGap;
    container.style.height = `${Math.max(...stack)}px`;
  };

  const recalculate = () => {
    container.querySelectorAll(selector).forEach((elt) => {
      elt.removeAttribute("style");
      calculate(elt);
    });
  };

  const setSize = () => {
    itemWidth = container.querySelector(selector).offsetWidth;
    const cols = Math.floor(container.offsetWidth / itemWidth);

    stack = [...new Array(cols)].map(() => 0);
  };

  m.resize = () => {
    container.querySelector(selector).removeAttribute("style");
    setSize();
    recalculate();
  };

  m.append = (element) => {
    element.forEach((elt) => {
      if (!elt.querySelector("img")) return;
      calculate(elt);
    });
  };

  setSize();
  m.append(elements);
  container.style.position = "relative";

  return m;
}
