import "../../css/Loading.css";

export function LoadingStart() {
  const loading = document.createElement("div");
  const loader = document.createElement("div");
  const pacman = document.createElement("div");
  const food = document.createElement("div");
  const foods = ["🍔", "🍕", "🌮", "🍰", "🍖"];

  loading.classList.add("loading");
  loader.classList.add("loader");
  pacman.classList.add("pacman");
  food.classList.add("food");

  foods.forEach((fd) => {
    const div = document.createElement("div");
    div.append(fd);
    food.append(div);
  });

  loader.append(pacman, food);
  loading.append(loader);

  return loading;
}

export function LoadingEnd() {
  const loading = document.querySelector(".loading");

  loading.remove();
}

export default { LoadingStart, LoadingEnd };
