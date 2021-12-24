import PostItem from "./PostItem";
import MasonryContainer from "./MasonryContainer";
import EmptyBox from "./EmptyBox";
import { getUserPostData } from "../api";

export default function UserPagePost() {
  const { id } = window.user;

  return MasonryContainer({
    fetcher: getUserPostData,
    args: [id],
    component: (article) =>
      PostItem({
        title: article.title,
        thumbnail: article.photo,
        slug: article.id,
        location: article.wideAddr
          ? `${article.wideAddr} ${article.localAddr}`
          : null,
        liked: article.isLiked,
        likes: article.likes,
      }),
    emptyComponent: EmptyBox({
      message: "아직 등록한 맛식이 없습니다.",
      icon: "icon-utensil-spoon-solid",
      link: "/add",
      linkMessage: "첫 맛식 등록하기",
    }),
  });
}
