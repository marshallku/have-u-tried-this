import el from "../utils/dom";
import "../../css/Carousel.css";

export default function Carousel(items: Array<IPhoto>) {
  const container = document.createElement("div");
  const carousel = document.createElement("div");
  const slider = document.createElement("ul");
  const dotsContainer = document.createElement("div");

  const buttons: Array<HTMLElement> = [];
  const dots: Array<HTMLElement> = [];

  let currentIndex = 0;
  let containerWidth = 0;
  let initialX = 0;
  let diffX = 0;

  const setContainerWidth = () => {
    containerWidth = container.offsetWidth;
  };

  const Count = () => {
    const count = document.createElement("span");
    const item = {
      elt: document.createElement("div"),
      update: (number: number) => {
        count.innerText = `${number}`;
      },
    };
    const amount = document.createElement("span");
    const slash = document.createTextNode(" / ");

    count.innerText = "1";
    amount.innerText = `${items.length}`;

    item.elt.classList.add("carousel__counter");
    if (items.length === 1) item.elt.classList.add("carousel__counter--hidden");
    item.elt.append(count, slash, amount);

    return item;
  };

  const counter = Count();

  const slide = (direction: TDirection) => {
    // First Page
    if (currentIndex === 0 && direction === -1) {
      slide(0);
      return;
    }

    // Last page
    if (direction === 1 && currentIndex === items.length - 1) {
      slide(0);
      return;
    }

    if (containerWidth === undefined) setContainerWidth();

    // Update currentIndex
    currentIndex += direction;

    // Update Buttons
    buttons.forEach((x) => x.classList.remove("carousel__button--disabled"));

    if (currentIndex === 0)
      buttons[0].classList.add("carousel__button--disabled");
    if (currentIndex === items.length - 1)
      buttons[1].classList.add("carousel__button--disabled");

    // Update Count
    counter.update(currentIndex + 1);

    // Update dots
    dots.forEach((x) => x.classList.remove("carousel__dot--active"));
    dots[currentIndex].classList.add("carousel__dot--active");

    // Slider Element
    slider.style.transform = `translate3d(${
      containerWidth * currentIndex * -1
    }px, 0, 0)`;
  };

  const CarouselItem = (item: IPhoto) =>
    el(
      "li",
      { className: "carousel__item" },
      el("img", { src: item.url, alt: item.text }),
    );

  const Button = (text: string, direction: TDirection) => {
    const button = document.createElement("button");

    button.classList.add(
      "carousel__button",
      `carousel__button--${text}`,
      "icon-arrow_forward_ios",
    );

    button.addEventListener("click", () => {
      slide(direction);
    });

    return button;
  };

  const Dot = () => el("button", { className: "carousel__dot" });

  const handleTouchMove = (event: TouchEvent) => {
    const currentX = event.touches[0].clientX;
    diffX = initialX - currentX;

    slider.style.transform = `translate3d(${
      containerWidth * currentIndex * -1 - diffX
    }px, 0, 0)`;
  };

  const handleTouchEnd = () => {
    slider.classList.remove("carousel__items--transition-removed");
    window.removeEventListener("touchmove", handleTouchMove);

    if (Math.abs(diffX) > 100) slide(diffX > 0 ? 1 : -1);
    else slide(0);
  };

  const handleTouchStart = (event: TouchEvent) => {
    if (event.touches.length > 1) return;
    if (containerWidth === undefined) setContainerWidth();

    initialX = event.touches[0].clientX;
    slider.classList.add("carousel__items--transition-removed");

    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, {
      passive: true,
      once: true,
    });
  };

  const resizeObserver = new ResizeObserver(() => {
    setContainerWidth();

    slide(0);
  });

  container.classList.add("carousel-container");
  carousel.classList.add("carousel");
  slider.classList.add("carousel__items");
  dotsContainer.classList.add("carousel__dots");
  if (items.length === 1) dotsContainer.classList.add("carousel__dots--hidden");

  items.forEach((item, i) => {
    const itemElt = CarouselItem(item);
    const dot = Dot();

    slider.append(itemElt);
    dots.push(dot);
    dotsContainer.append(dot);
  });
  dots[currentIndex].classList.add("carousel__dot--active");

  carousel.append(slider);
  carousel.append(dotsContainer);
  carousel.append(counter.elt);
  const buttonsTuple: Array<[string, TDirection]> = [
    ["back", -1],
    ["forward", 1],
  ];
  buttonsTuple.forEach(([text, direction]) => {
    const button = Button(text, direction);

    buttons.push(button);
    carousel.append(button);
  });
  buttons[0].classList.add("carousel__button--disabled");

  container.addEventListener("touchstart", handleTouchStart, { passive: true });
  container.append(carousel);

  resizeObserver.observe(carousel);

  return container;
}
