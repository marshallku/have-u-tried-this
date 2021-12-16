import "../../css/GlobalNavigation.css";
import { addClickEvent } from "../router";

const Profile = document.createElement("img");

export default function GlobalNavigation() {
  const nav = document.createElement("nav");
  const logoWrap = document.createElement("div");
  const logoAnchor = document.createElement("a");
  const logo = document.createElement("img");
  const searchForm = document.createElement("form");
  const search = document.createElement("input");
  const profileWrap = document.createElement("div");
  const profileAnchor = document.createElement("a");

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
  search.placeholder = "검색어를 입력하세요.";
  search.classList.add("search__input", "search__input--gnb");

  searchForm.append(search);

  // Profile
  profileWrap.classList.add("gnb__profile-image");
  Profile.src = "/static/images/default_profile.png";
  profileAnchor.href = "/user";
  addClickEvent(profileAnchor, "/user");
  profileAnchor.append(Profile);
  profileWrap.append(profileAnchor);

  // Append
  nav.append(logoWrap, searchForm, profileWrap);

  return nav;
}

export function UpdateGnbProfile(src) {
  Profile.src = src;
}
