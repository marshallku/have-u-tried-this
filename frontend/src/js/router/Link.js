function handleClick(event) {
  event.preventDefault();
}

export default function Link({ href }) {
  const a = document.createElement("a");

  a.href = href;
  a.addEventListener("click", handleClick);

  return a;
}
