import GridContainer from "../components/GridContainer";
import CityList from "../components/CityList";

export default function FrontPage(data) {
  const container = GridContainer();
  container.classList.add("city");
  console.log("FrontPage working");

  data.forEach((article, index) =>
    container.append(
      CityList({
        thumbnail: article.photo,
        order: index + 1,
        wide_addr: article.wide_addr,
        local_addr: article.local_addr,
      }),
    ),
  );

  return container;
}
