import PostItem from "../components/PostItem";
import GridContainer from "../components/GridContainer";
import { fetchPostListData } from "../api/dummy";

export default function FrontPage() {
  const div = document.createElement("div");

  fetchPostListData().then((data) => {
    const container = GridContainer();

    data.forEach((article) =>
      container.append(
        PostItem({
          title: article.title,
          thumbnail: article.photo,
          slug: article.id,
          location: article.wideAddr
            ? `${article.wideAddr} ${article.localAddr}`
            : null,
          likes: article.likes,
        }),
      ),
    );

    div.append(container);
  });

  return div;
}
