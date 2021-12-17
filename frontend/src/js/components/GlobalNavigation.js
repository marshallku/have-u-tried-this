import { addClickEvent, updatePath } from "../router";
import "../../css/GlobalNavigation.css";
import WordAutoComplete from "./WordAutoComplete";

const Profile = document.createElement("img");

export default function GlobalNavigation() {
  const nav = document.createElement("nav");
  const logoWrap = document.createElement("div");
  const logoAnchor = document.createElement("a");
  const logo = document.createElement("img");
  const searchForm = document.createElement("form");
  const search = document.createElement("input");
  const createPost = document.createElement("a");
  const profileWrap = document.createElement("div");
  const profileAnchor = document.createElement("a");
  const dataList = document.createElement("datalist");
  WordAutoComplete(dataList);

  // Nav
  nav.classList.add("gnb");

  // Logo
  logoWrap.classList.add("gnb__logo");
  logoAnchor.href = "/";
  addClickEvent(logoAnchor, "/");
  logo.src = "/static/images/logo.svg";
  logoAnchor.append(logo);
  logoWrap.append(logoAnchor);

  // Search Form
  searchForm.classList.add("search", "search--gnb");
  search.type = "text";
  search.id = "search";
  search.name = "search";
  search.placeholder = "위치 검색";
  search.setAttribute("list", "address");
  search.classList.add("search__input", "search__input--gnb");
  dataList.id = "address";

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // TODO: 입력받은 지역 올바른 지역인지 검증
    const [wideAddr, localAddr] = search.value.split(" ");
    updatePath(`/location/${wideAddr}/${localAddr}`);
  });
  searchForm.append(search);
  searchForm.append(dataList);

  // Nav
  createPost.classList.add("gnb__add-post", "icon-add_a_photo");
  addClickEvent(createPost, "/add");

  // Profile
  profileWrap.classList.add("gnb__profile-image");
  Profile.src = "/static/images/default_profile.png";
  addClickEvent(profileAnchor, "/login");
  profileAnchor.append(Profile);
  profileWrap.append(profileAnchor);

  // Append
  nav.append(logoWrap, searchForm, createPost, profileWrap);

  return nav;
}

export function UpdateGnbProfile(src) {
  Profile.src = src;
}
