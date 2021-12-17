import "../../css/Carousel.css";

export default function Carousel(items) {
  const container = document.createElement("div");
  const carousel = document.createElement("div");
  const slider = document.createElement("ul");
  const dotsContainer = document.createElement("div");

  const buttons = [];
  const dots = [];

  let currentIndex = 0;
  let containerWidth;
  let initialX;
  let diffX;
  let scrollLocked = false;

  const setContainerWidth = () => {
    containerWidth = container.offsetWidth;
  };

  const slide = (direction) => {
    // First Page
    if (currentIndex === 0 && direction === -1) return slide(0);

    // Last page
    if (direction === 1 && currentIndex === items.length - 1) return slide(0);

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

  const CarouselItem = (src) => {
    const li = document.createElement("li");
    const img = document.createElement("img");

    li.classList.add("carousel__item");

    img.src = src;

    li.append(img);

    return li;
  };

  const Button = (text, direction) => {
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

  const Dot = () => {
    const button = document.createElement("div");

    button.classList.add("carousel__dot");

    return button;
  };

  const Count = () => {
    const item = {
      elt: document.createElement("div"),
      update: function (number) {
        count.innerText = `${number}`;
      },
    };
    const count = document.createElement("span");
    const amount = document.createElement("span");
    const slash = document.createTextNode(" / ");

    count.innerText = "1";
    amount.innerText = items.length;

    item.elt.classList.add("carousel__counter");
    item.elt.append(count, slash, amount);

    return item;
  };

  const handleTouchEnd = () => {
    slider.classList.remove("carousel__items--transition-removed");
    window.removeEventListener("touchmove", handleTouchMove);
    scrollLocked = false;

    if (Math.abs(diffX) > 100) slide(diffX > 0 ? 1 : -1);
    else slide(0);
  };

  const handleTouchMove = (event) => {
    if (scrollLocked && event.cancelable) event.preventDefault();

    const currentX = event.touches[0].clientX;
    diffX = initialX - currentX;

    if (!scrollLocked && Math.abs(diffX) > 50) scrollLocked = true;

    slider.style.transform = `translate3d(${
      containerWidth * currentIndex * -1 - diffX
    }px, 0, 0)`;
  };

  const handleTouchStart = (event) => {
    if (event.touches.length > 1) return;
    if (containerWidth === undefined) setContainerWidth();

    initialX = event.touches[0].clientX;
    slider.classList.add("carousel__items--transition-removed");

    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd, { once: true });
  };

  const counter = Count();

  container.classList.add("carousel-container");
  carousel.classList.add("carousel");
  slider.classList.add("carousel__items");
  dotsContainer.classList.add("carousel__dots");

  items.forEach((item, i) => {
    const itemElt = CarouselItem(item);
    const dot = Dot(i);
    slider.append(itemElt);
    dots.push(dot);
    dotsContainer.append(dot);
  });
  dots[currentIndex].classList.add("carousel__dot--active");

  carousel.append(slider);
  carousel.append(dotsContainer);
  carousel.append(counter.elt);
  [
    ["back", -1],
    ["forward", 1],
  ].forEach(([text, direction]) => {
    const button = Button(text, direction);

    buttons.push(button);
    carousel.append(button);
  });
  buttons[0].classList.add("carousel__button--disabled");

  container.addEventListener("touchstart", handleTouchStart);
  container.append(carousel);

  return container;
}
