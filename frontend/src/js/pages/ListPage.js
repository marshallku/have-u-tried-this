import PostItem from "../components/PostItem";
import MasonryContainer from "../components/MasonryContainer";

export default function FrontPage() {
  return MasonryContainer("http://localhost:9980/tmp", (article) =>
    PostItem({
      title: article.title,
      thumbnail: article.photo,
      slug: article.id,
      location: article.wideAddr
        ? `${article.wideAddr} ${article.localAddr}`
        : null,
      likes: article.likes,
    }),
  );
}
