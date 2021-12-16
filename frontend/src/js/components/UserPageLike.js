import GridContainer from "./GridContainer";
import { fetchPostListData } from "../api/dummy";
import PostItem from "./PostItem";

export default function UserPageLike() {
  const container = GridContainer();

  fetchPostListData().then((response) => {
    response.forEach((article) =>
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
  });

  return container;
}
