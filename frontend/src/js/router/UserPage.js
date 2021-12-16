import UserPageInfo from "../components/UserPageInfo";
import UserPagePost from "../components/UserPagePost";
import UserPageComment from "../components/UserPageComment";
import UserPageLike from "../components/UserPageLike";
import { fetchUserData } from "../api/dummy";
import "../../css/userPage.css";

const Main = document.createElement("main");
const Title = document.createElement("h1");

function renderTitle(string) {
  Title.innerText = string;
}

function resetPage() {
  Main.innerHTML = "";
}

function renderPage(text, component) {
  resetPage();
  renderTitle(text);
  Main.append(component);
}

function Drawer() {
  const nav = document.createElement("nav");
  const profileWrap = document.createElement("div");
  const profile = document.createElement("img");
  const Button = ({ text, className, render }) => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    li.classList.add("nav__item", `nav__${className}`);

    a.href = `/settings/profile/${className}`;
    a.innerText = text;
    a.addEventListener("click", (event) => {
      event.preventDefault();
      renderPage(text, render());
    });

    li.append(a);

    return li;
  };
  const ul = document.createElement("ul");
  const info = Button({
    text: "내 정보",
    className: "info",
    render: UserPageInfo,
  });
  const post = Button({
    text: "작성 글",
    className: "post",
    render: UserPagePost,
  });
  const comment = Button({
    text: "작성 댓글",
    className: "comment",
    render: UserPageComment,
  });
  const liked = Button({
    text: "추천한 글",
    className: "liked",
    render: UserPageLike,
  });

  // Nav
  nav.classList.add("nav");

  // Profile
  profileWrap.classList.add("nav__photo");
  fetchUserData().then((response) => {
    profile.src = response.profile;
    profileWrap.append(profile);
  });

  // List items
  ul.classList.add("nav__items");
  ul.append(info, post, comment, liked);

  // Append
  nav.append(profileWrap);
  nav.append(ul);

  return nav;
}

export default async function UserPage() {
  const fragment = document.createDocumentFragment();
  const drawer = Drawer();

  Main.classList.add("settings");
  Title.classList.add("settings__title");

  fragment.append(drawer, Title, Main);

  return fragment;
}
