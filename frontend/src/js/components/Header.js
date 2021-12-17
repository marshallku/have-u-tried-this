import "../../css/Header.css";

function Header({ title }) {
  const header = document.createElement("header");
  const titleElt = document.createElement("h1");

  header.classList.add("header");
  titleElt.classList.add("header__title");
  titleElt.innerText = title;
  header.append(titleElt);

  return header;
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
  const [wideAddr, localAddr] = window.location.pathname
    .split("/")
    .slice(2)
    .map((x) => decodeURI(x));

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
