import { addClickEvent, updatePath } from "../router";
import "../../css/GlobalNavigation.css";
import WordAutoComplete from "./WordAutoComplete";
import el from "../utils/dom";

export default function GlobalNavigation() {
  const logoAnchor = el("a", {}, el("img", { src: "/static/images/logo.svg" }));
  const createBtn = el("a", { className: "gnb__add-post icon-add_a_photo" });
  const profileAnchor = el(
    "a",
    {},
    el("img", { src: "/static/images/default_profile.png" }),
  );
  const dataList = WordAutoComplete();

  dataList.id = "address";
  addClickEvent(logoAnchor, "/");
  addClickEvent(createBtn, "/add");
  addClickEvent(profileAnchor, "/login");

  return el(
    "nav",
    { className: "gnb" },
    el("div", { className: "gnb__logo" }, logoAnchor),
    el(
      "form",
      {
        className: "search search--gnb",
        events: {
          submit: (event) => {
            event.preventDefault();
            // TODO: 입력받은 지역 올바른 지역인지 검증
            const input = document.querySelector(".search__input");
            if (!input) return;
            const [wideAddr, localAddr] = input.value.split(" ");

            updatePath(`/location/${wideAddr}/${localAddr}`);
          },
        },
      },
      el("input", {
        type: "text",
        id: "search",
        name: "search",
        placeholder: "위치 검색",
        list: "address",
        className: "search__input search__input--gnb",
      }),
      dataList,
    ),
    createBtn,
    el("div", { className: "gnb__profile-image" }, profileAnchor),
  );
}

export function UpdateGnbProfile(src) {
  document.querySelector(".gnb__profile-image img").src = src;
}
