import GridContainer from "../components/GridContainer";
import PostItem from "../components/PostItem";

export default function List(data) {
  const container = GridContainer();

  data.forEach((article) =>
    container.append(
      PostItem({
        title: article.title,
        thumbnail: article.photo,
        slug: article.id,
        likes: article.likes,
      }),
    ),
  );

  return container;
}
