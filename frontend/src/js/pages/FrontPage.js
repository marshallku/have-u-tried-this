import el from "../utils/dom";
import MasonryContainer from "../components/MasonryContainer";
import CityItem from "../components/CityItem";
import { getLocationListData } from "../api";
import Typewriter from "../components/Typewriter";
import { addressData } from "../api/dummy";
import "../../css/FrontPage.css";

export default function FrontPage() {
  return el(
    "fragment",
    {},
    el(
      "header",
      { className: "header" },
      el(
        "h1",
        { className: "header__title" },
        el("div", {}, "지역별 맛식 저장소"),
        el(
          "div",
          {},
          Typewriter(Object.keys(addressData)),
          "가서",
          el("span", { className: "highlight" }, " OOO 먹어봄?"),
        ),
      ),
    ),
    MasonryContainer({
      fetcher: getLocationListData,
      args: [],
      component: (location) =>
        CityItem({
          wide: location.wideAddr,
          local: location.localAddr,
          thumbnail: location.photo,
        }),
    }),
  );
}
