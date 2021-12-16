import List from "../components/List";
import { fetchLocationListData } from "../api/dummy";

export default function FrontPage() {
  const div = document.createElement("div");

  fetchLocationListData().then((data) => {
    div.append(List(data));
  });

  return div;
}
