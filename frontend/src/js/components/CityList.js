import "../../css/city.css";

export default function CityList({ thumbnail, order, wide_addr, local_addr }) {
  const article = document.createElement("article");
  const figure = document.createElement("figure");
  const img = document.createElement("img");

  const city_num = document.createElement("p");
  const city_wide_addr = document.createElement("p");
  const city_local_addr = document.createElement("p");

  // City item
  article.classList.add("city__item");

  // Image
  figure.classList.add("city__img");
  img.src = thumbnail;
  figure.append(img);
  article.append(figure);

  // Order
  city_num.innerText = order;
  article.append(city_num);

  // Wide address
  city_wide_addr.innerText = wide_addr;
  article.append(city_wide_addr);

  city_local_addr.innerText = local_addr;
  article.append(city_local_addr);

  return article;
}
