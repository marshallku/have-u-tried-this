import el from "../utils/dom";
import toast from "../utils/toast";
import imagesLoaded from "../utils/imagesLoaded";
import { debounce } from "../utils/optimize";
import Loader from "./Loader";
import masonry from "../utils/masonry";
import "../../css/MasonryContainer.css";

export default function MasonryContainer({ fetcher, args, component }) {
  let page = 1;
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

    try {
      const { data, pagination } = await fetcher(...args, page);
      if (!data.length) {
        if (page === 1) {
          container.append(
            el(
              "div",
              { className: "empty-notifier" },
              el("h2", {}, "아무것도 보여드릴 게 없어요. 😥"),
            ),
          );
          return;
        }
        loader.remove();
        return;
      }
      const fragment = el("fragment", {});
      const elements = data.map((x) => component(x));

      if (!pagination.nextPage) {
        isDone = true;
        // eslint-disable-next-line no-use-before-define
        io.unobserve(observeTarget);
      }

      await imagesLoaded(elements, () => {
        page += 1;
        isLoading = false;
      });

      loader.remove();
      elements.forEach((elt) => fragment.append(elt));

      container.append(fragment);

      if (initialize) {
        const style = getComputedStyle(container);

        msnry = masonry({
          container,
          selector: "article",
          elements,
          padding: {
            top: parseInt(style.paddingTop, 10),
            left: parseInt(style.paddingLeft, 10),
          },
          gap: parseInt(style.rowGap, 10),
        });
        // eslint-disable-next-line no-use-before-define
        io.observe(observeTarget);
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

  window.resizeHandler = handleResize;
  window.addEventListener("resize", window.resizeHandler, { passive: true });

  return container;
}
