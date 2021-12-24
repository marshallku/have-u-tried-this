import PostItem from "./PostItem";
import MasonryContainer from "./MasonryContainer";
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
        likes: article.likes,
      }),
  });
}
