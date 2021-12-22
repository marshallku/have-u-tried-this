import MasonryContainer from "../components/MasonryContainer";
import CityItem from "../components/CityItem";
import { fetchLocationListData } from "../api";

export default function FrontPage() {
  return MasonryContainer({
    fetcher: fetchLocationListData,
    args: [],
    component: (location) =>
      CityItem({
        wide: location.wideAddr,
        local: location.localAddr,
        thumbnail: location.photo,
      }),
  });
}
