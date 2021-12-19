import el from "../utils/dom";
import GridContainer from "../components/GridContainer";
import CityItem from "../components/CityItem";
import Loader from "../components/Loader";
import { fetchLocationListData } from "../api/dummy";

export default function FrontPage() {
  const loader = Loader();
  const div = el("div", {}, loader);

  fetchLocationListData().then((data) => {
    const container = GridContainer();

    loader.remove();

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
