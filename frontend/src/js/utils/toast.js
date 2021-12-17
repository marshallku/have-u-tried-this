import "../../css/toast.css";

export default function toast(str, timeout = 3000) {
  const div = document.createElement("div");

  // Remove toast messages if exist
  document
    .querySelectorAll(".toast")
    .forEach((elt) => elt.classList.remove("toast--reveal"));

  div.innerText = str;
  div.classList.add("toast", "toast--reveal");

  div.addEventListener(
    "transitionend",
    () => {
      div.remove();
    },
    { once: true },
  );

  setTimeout(() => {
    div.classList.remove("toast--reveal");
  }, timeout);

  document.body.append(div);
}
