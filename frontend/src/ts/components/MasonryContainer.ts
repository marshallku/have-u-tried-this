import el from "../utils/dom";
import toast from "../utils/toast";
import imagesLoaded from "../utils/imagesLoaded";
import { debounce } from "../utils/optimize";
import Loader from "./Loader";
import masonry from "../utils/masonry";
import "../../css/MasonryContainer.css";

declare global {
  interface Window {
    resizeHandler: () => void | null;
  }
}

export default function MasonryContainer({
  fetcher,
  args,
  component,
  emptyComponent,
}: {
  // TODO: Remove any
  fetcher: any;
  args: Array<any>;
  component: (x: any) => HTMLElement;
  emptyComponent: HTMLElement;
}) {
  let page = 1;
  let isDone = false;
  let isLoading = false;
  let msnry: IMasonryObj;
  const container = el("div", { className: "masonry-container" });
  const observeTarget = document.querySelector(".footer");
  const loader = Loader();
  const fetchData = async (initialize?: boolean) => {
    if (isLoading || isDone) return;
    isLoading = true;
    container.append(loader);

    try {
      const { data, pagination, error } = await fetcher(...args, page);
      if (!data || error || !data.length) {
        if (page === 1) {
          container.append(
            emptyComponent ||
              el(
                "div",
                { className: "empty-notifier" },
                el("h2", {}, "아무것도 보여드릴 게 없어요. 😥"),
              ),
          );
          container.classList.remove("masonry-container");
          loader.remove();
          return;
        }
        loader.remove();
        return;
      }
      const fragment = el("fragment", {});
      const elements = data.map((x: IPost | ILocation) => component(x));

      if (!pagination.nextPage) {
        isDone = true;
        // eslint-disable-next-line no-use-before-define
        observeTarget && io.unobserve(observeTarget);
      }

      await imagesLoaded(elements, () => {
        page += 1;
        isLoading = false;
      });

      loader.remove();
      elements.forEach((elt: HTMLElement) => fragment.append(elt));

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
        observeTarget && io.observe(observeTarget);
      } else {
        msnry.append(elements);
      }
    } catch (err) {
      if (typeof err === "string") toast(err);
      console.log(err);
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
