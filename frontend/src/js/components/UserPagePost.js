import PostItem from "./PostItem";
import MasonryContainer from "./MasonryContainer";
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
  });
}
