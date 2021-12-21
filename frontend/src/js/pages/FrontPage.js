import el from "../utils/dom";
import GridContainer from "../components/GridContainer";
import CityItem from "../components/CityItem";
import Loader from "../components/Loader";
import { fetchLocationListData } from "../api";

export default function FrontPage() {
  const loader = Loader();
  const div = el("div", {}, loader);

  fetchLocationListData().then((data) => {
    const container = GridContainer();
    const fragment = document.createDocumentFragment();

    loader.remove();

    data.data.forEach((location) =>
      fragment.append(
        CityItem({
          wide: location.wideAddr,
          local: location.localAddr,
          thumbnail: location.photo,
        }),
      ),
    );

    container.append(fragment);
    div.append(container);
  });

  return div;
}
