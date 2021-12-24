import { getPostListData } from "../api";
import PostItem from "../components/PostItem";
import MasonryContainer from "../components/MasonryContainer";
import { getPaths } from "../utils/location";
import el from "../utils/dom";

export default function ListPage() {
  const [wideAddr, localAddr] = getPaths(2);

  return el(
    "fragment",
    {},
    el(
      "header",
      { className: "header" },
      el(
        "h1",
        { className: "header__title" },
        el("span", { className: "highlight" }, `❝ ${wideAddr} ${localAddr} ❞`),
        " 맛식",
      ),
    ),
    MasonryContainer({
      fetcher: getPostListData,
      args: [wideAddr, localAddr],
      component: (article) =>
        PostItem({
          title: article.title,
          thumbnail: article.photo,
          slug: article.id,
          location: article.wideAddr
            ? `${article.wideAddr} ${article.localAddr}`
            : null,
          likes: article.likes,
        }),
    }),
  );
}
