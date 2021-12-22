import { getPostListData } from "../api";
import PostItem from "../components/PostItem";
import MasonryContainer from "../components/MasonryContainer";
import { getPaths } from "../utils/location";

export default function ListPage() {
  const [wideAddr, localAddr] = getPaths(2);

  return MasonryContainer({
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
  });
}
