import MasonryList from "../pages/MasonryList";

export default function InfiniteScroll(element) {
  const io = new IntersectionObserver(([entry], observer) => {
    if (entry.isIntersecting) {
      MasonryList();
      observer.unobserve(entry.target);
    }
  });

  io.observe(element);
}
