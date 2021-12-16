import List from "../components/List";
import { fetchPostListData } from "../api/dummy";

export default function FrontPage() {
  const div = document.createElement("div");

  fetchPostListData().then((data) => {
    div.append(List(data));
  });

  return div;
}
