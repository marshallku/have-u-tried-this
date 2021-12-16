import GridContainer from "../components/GridContainer";
import CityItem from "../components/CityItem";
import { fetchLocationListData } from "../api/dummy";

export default function FrontPage() {
  const div = document.createElement("div");

  fetchLocationListData().then((data) => {
    const container = GridContainer();

    data.forEach((location) =>
      container.append(
        CityItem({
          wide: location.wideAddr,
          local: location.localAddr,
          thumbnail: location.photo,
        }),
      ),
    );

    div.append(container);
  });

  return div;
}
