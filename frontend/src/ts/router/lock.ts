import Modal from "../components/Modal";
import removeHash from "../utils/history";

function handlePopState() {
  const { hash } = window.location;

  if (hash !== "#locked") {
    window.location.hash = "locked";
  } else {
    const app = document.getElementById("app");

    app?.append(
      Modal({
        title: "내용이 사라집니다!",
        content: "페이지를 벗어나시겠습니까?",
        callback: () => {
          // eslint-disable-next-line no-use-before-define
          unlock();
          window.history.go(-2);
        },
      }),
    );
  }
}

function handleBeforeUnload(event: BeforeUnloadEvent) {
  event.preventDefault();
  // eslint-disable-next-line no-param-reassign
  event.returnValue = "";
}

export function lock() {
  if (window.location.hash === "#locked") return;
  window.location.hash = "locked";
  window.addEventListener("popstate", handlePopState);
  window.addEventListener("beforeunload", handleBeforeUnload);
}

export function unlock() {
  window.removeEventListener("popstate", handlePopState);
  window.removeEventListener("beforeunload", handleBeforeUnload);
  if (window.location.hash === "#locked") {
    removeHash();
  }
}

export function checkLock(event: Event) {
  const { target } = event;
  const imageElt = document.querySelector(".image-content__preview");
  const titleElt = document.querySelector(".image-content__title");
  const descElt = document.querySelector(".image-content__desc");

  // Check element exists
  if (!imageElt || !titleElt || !descElt) return;

  // Check element type
  if (
    !(titleElt instanceof HTMLInputElement) ||
    !(descElt instanceof HTMLInputElement)
  )
    return;

  const image = imageElt.firstChild;
  const title = titleElt.value;
  const desc = descElt.value;

  if (target instanceof HTMLInputElement && target.value) {
    lock();
    return;
  }

  if (image || title || desc) return;

  unlock();
}
