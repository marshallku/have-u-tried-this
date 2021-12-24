import PostItem from "./PostItem";
import MasonryContainer from "./MasonryContainer";
import EmptyBox from "./EmptyBox";
import { getUserLikeData } from "../api";

export default function UserPageLike() {
  const { id } = window.user;

  return MasonryContainer({
    fetcher: getUserLikeData,
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
      message: "아직 좋아요한 맛식이 없습니다.",
      icon: "icon-favorite_outline",
      link: "/",
      linkMessage: "맛식 보러 가기",
    }),
  });
}
