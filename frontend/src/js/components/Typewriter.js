import el from "../utils/dom";

export default function Typewriter(texts, speed = 250) {
  let i = 0;
  let j = 0;

  const element = el("span", {});

  const txtNum = () => (j === texts.length - 1 ? 0 : j + 1);

  const type = () => {
    if (i < texts[j].length) {
      element.innerText += texts[j].charAt(i);
      i += 1;
      setTimeout(type, speed);
    } else {
      // eslint-disable-next-line no-use-before-define
      remove();
    }
  };

  const remove = () => {
    if (i >= 0) {
      element.innerText = element.innerText.slice(0, i);
      i -= 1;
      setTimeout(remove, speed);
    } else {
      type();
      j = txtNum();
    }
  };

  type();

  return element;
}
