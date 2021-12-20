import { resetWithSize } from "./array";
import { isZero } from "./number";

/* eslint-disable no-param-reassign */
export default function masonry({ container, selector, elements }) {
  const masonryObj = {};
  const stack = [];
  let itemWidth;

  const calculate = (elt) => {
    const min = Math.min(...stack);
    const currentPosition = stack.indexOf(min);
    const xGap = isZero(currentPosition) ? 0 : 20;
    const yGap = isZero(min) ? 0 : 20;
    const x = currentPosition * itemWidth + xGap * currentPosition;
    const y = isZero(min) ? 0 : min + yGap;
    const height = elt.querySelector("img").offsetHeight;

    elt.style.position = "absolute";
    elt.style.left = `${x + 10}px`;
    elt.style.top = `${y}px`;
    elt.style.width = `${itemWidth}px`;
    elt.style.height = `${height}px`;

    if (stack[currentPosition] !== undefined) {
      stack[currentPosition] = min + height + yGap;
    }

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

    resetWithSize(stack, cols, 0);
  };

  masonryObj.resize = () => {
    container.querySelector(selector).removeAttribute("style");
    setSize();
    recalculate();
  };

  masonryObj.append = (element) => {
    element.forEach((elt) => {
      if (!elt.querySelector("img")) return;
      calculate(elt);
    });
  };

  setSize();
  masonryObj.append(elements);
  container.style.position = "relative";

  return masonryObj;
}
