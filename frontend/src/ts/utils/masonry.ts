import { resetWithSize } from "./array";
import { isZero } from "./number";

/* eslint-disable no-param-reassign */
export default function masonry({
  container,
  selector,
  elements,
  padding,
  gap,
}: MasonryOptions): IMasonryObj {
  const stack: Array<number> = [];
  let itemWidth: number;

  const calculate = (elt: HTMLElement) => {
    const min = Math.min(...stack);
    const currentPosition = stack.indexOf(min);
    const xGap = isZero(currentPosition, gap);
    const yGap = isZero(min, gap);
    const x = currentPosition * (itemWidth + xGap) + padding.left;
    const y = isZero(min, min + yGap) + padding.top;
    const height = elt.querySelector("img")?.offsetHeight || 0;

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
      if (!(elt instanceof HTMLElement)) return;
      elt.removeAttribute("style");
      calculate(elt);
    });
  };

  const setSize = () => {
    const item = container.querySelector(selector);
    if (!item || !(item instanceof HTMLElement)) return;
    itemWidth = item.offsetWidth;
    const cols = Math.floor(container.offsetWidth / itemWidth);

    resetWithSize(stack, cols, 0);
  };

  const masonryObj: IMasonryObj = {
    resize() {
      container.querySelector(selector)?.removeAttribute("style");
      setSize();
      recalculate();
    },
    append(appendedElements: HTMLElement[]) {
      appendedElements.forEach((elt) => {
        if (!elt.querySelector("img")) return;
        calculate(elt);
      });
    },
  };

  setSize();
  masonryObj.append(elements);
  container.style.position = "relative";

  return masonryObj;
}
