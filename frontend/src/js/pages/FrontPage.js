import el from "../utils/dom";
import MasonryContainer from "../components/MasonryContainer";
import CityItem from "../components/CityItem";
import { getLocationListData } from "../api";
import "../../css/FrontPage.css";

export default function FrontPage() {
  return MasonryContainer({
    fetcher: getLocationListData,
    args: [],
    component: (location) =>
      CityItem({
        wide: location.wideAddr,
        local: location.localAddr,
        thumbnail: location.photo,
      }),
  });
}
