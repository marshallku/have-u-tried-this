import { resetWithSize } from "./array";
import { isZero } from "./number";

/* eslint-disable no-param-reassign */
// TODO: padding과 gap값을 전달받는 것과 계산하는 것 중 무엇이 나을지 생각하기
export default function masonry({
  container,
  selector,
  elements,
  padding,
  gap,
}) {
  const masonryObj = {};
  const stack = [];
  let itemWidth;

  const calculate = (elt) => {
    const min = Math.min(...stack);
    const currentPosition = stack.indexOf(min);
    const xGap = isZero(currentPosition, gap);
    const yGap = isZero(min, gap);
    const x = currentPosition * (itemWidth + xGap) + padding.left;
    const y = isZero(min, min + yGap) + padding.top;
    const height = elt.querySelector("img").offsetHeight;

    elt.style.position = "absolute";
    elt.style.left = `${x}px`;
    elt.style.top = `${y}px`;
    elt.style.width = `${itemWidth}px`;
    elt.style.height = `${height}px`;

    elt.classList.add("revealed");

    if (stack[currentPosition] !== undefined) {
      stack[currentPosition] = min + height + yGap;
    }

    container.style.height = `${Math.max(...stack) + padding.top * 2}px`;
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
