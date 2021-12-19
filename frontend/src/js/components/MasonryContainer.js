import el from "../utils/dom";
import { addQuery } from "../utils/format";
import toast from "../utils/toast";
import imagesLoaded from "../utils/imagesLoaded";
import { debounce } from "../utils/optimize";
import Loader from "./Loader";
import masonry from "../utils/masonry";
import "../../css/MasonryContainer.css";

export default function MasonryContainer(apiUri, component) {
  let currentPage = 1;
  let isDone = false;
  let isLoading = false;
  let msnry;
  const container = el("div", { className: "masonry-container" });
  const observeTarget = document.querySelector(".footer");
  const loader = Loader();
  const fetchData = async (initialize) => {
    if (isLoading || isDone) return;
    isLoading = true;
    container.append(loader);

    const requestUri = addQuery({
      uri: apiUri,
      query: "page",
      value: currentPage,
    });

    try {
      const response = await fetch(requestUri);
      const json = await response.json();
      const fragment = el("fragment", {});
      const elements = json.data.map((x) => component(x));

      if (!json.pagination.nextPage) {
        isDone = true;
        // eslint-disable-next-line no-use-before-define
        io.unobserve(observeTarget);
      }

      await imagesLoaded(elements, () => {
        currentPage += 1;
        isLoading = false;
      });

      loader.remove();
      elements.forEach((elt) => fragment.append(elt));

      container.append(fragment);

      if (initialize) {
        msnry = masonry({
          container,
          selector: ".post-item",
          elements,
        });
      } else {
        msnry.append(elements);
      }
    } catch (err) {
      toast(err);
    }
  };
  const io = new IntersectionObserver(() => fetchData());
  const handleResize = debounce(() => {
    msnry.resize();
  }, 500);

  fetchData(true);
  io.observe(observeTarget);

  window.resizeHandler = handleResize;
  window.addEventListener("resize", window.resizeHandler);

  return container;
}
