import el from "../utils/dom";
import { getPaths } from "../utils/location";
import "../../css/Header.css";

function Header({ title }) {
  return el(
    "header",
    { className: "header" },
    el("h1", { className: "header__title" }, title),
  );
}

function updateHeader({ element, title }) {
  const header = element;
  const titleElt = header.querySelector("h1.header__title");

  if (!titleElt) {
    header.remove();
    document.body.prepend(
      Header({
        title,
      }),
    );
    return;
  }

  titleElt.innerText = title;
}

function checkHeader({ title }) {
  const { body } = document;
  const header = body.querySelector(".header");

  if (header)
    updateHeader({
      element: header,
      title,
    });
  else body.prepend(Header({ title }));
}

export default function renderHeader(page) {
  const [wideAddr, localAddr] = getPaths().slice(1);

  switch (page) {
    case "":
      checkHeader({
        title: "지역별 맛식 저장소\n여행가서 OOO 먹어봄?",
      });
      break;
    case "location":
      checkHeader({
        title: `${wideAddr} ${localAddr} 맛식`,
      });
      break;
    default:
      document.body.querySelector(".header")?.remove();
  }
}
