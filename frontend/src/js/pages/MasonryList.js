import MasonryContainer from "../components/MasonryContainer";
import MasonryItem from "../components/MasonryItem";
import { fetchPostListData } from "../api/dummy";
import "../../css/PostList.css";

const cache = [];

export default function MasonryList(reRender) {
  let container = MasonryContainer();
  const node = document.querySelector(".masonry-container");

  if (reRender) {
    node.remove();
    cache.forEach((post, idx) =>
      container.append(
        MasonryItem({
          key: idx,
          title: post.title,
          photo: post.photo,
          slug: post.id,
          location: post.wideAddr ? `${post.wideAddr} ${post.localAddr}` : null,
          likes: post.likes,
        }),
      ),
    );
    return container;
  }

  if (node) {
    container = node;
  }

  fetchPostListData().then((data) => {
    cache.push(...data);
    data.forEach((post, idx) =>
      container.append(
        MasonryItem({
          key: idx,
          title: post.title,
          photo: post.photo,
          slug: post.id,
          location: post.wideAddr ? `${post.wideAddr} ${post.localAddr}` : null,
          likes: post.likes,
        }),
      ),
    );
  });

  return container;
}
