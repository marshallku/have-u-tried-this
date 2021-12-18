import "../../css/Loader.css";

export default function Loader() {
  const loader = document.createElement("div");
  const pacman = document.createElement("div");
  const food = document.createElement("div");
  const foods = ["🍔", "🍕", "🌮", "🍰", "🍖", "🧀"];

  loader.classList.add("loader");
  pacman.classList.add("pacman");
  food.classList.add("food");

  foods.forEach((emoji) => {
    const div = document.createElement("div");

    div.append(emoji);
    food.append(div);
  });

  loader.append(food, pacman);

  return loader;
}
