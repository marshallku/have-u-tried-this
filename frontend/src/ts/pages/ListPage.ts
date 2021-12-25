import { getPostListData } from "../api";
import PostItem from "../components/PostItem";
import MasonryContainer from "../components/MasonryContainer";
import { getPaths } from "../utils/location";
import EmptyBox from "../components/EmptyBox";
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
      component: (article: IPost) =>
        PostItem({
          title: article.title,
          thumbnail: article.photo,
          slug: article.id,
          liked: article.isLiked,
          likes: article.likes,
        }),
      emptyComponent: EmptyBox({
        message: "아직 등록된 맛식이 없습니다.",
        icon: "icon-utensil-spoon-solid",
        link: "/add",
        linkMessage: "첫 맛식 등록하기",
      }),
    }),
  );
}
