import Modal from "../components/Modal";
import removeHash from "../utils/history";

function handlePopState() {
  const { hash } = window.location;

  if (hash !== "#locked") {
    window.location.hash = "locked";
  } else {
    Modal({
      title: "내용이 사라집니다!",
      content: "페이지를 벗어나시겠습니까?",
      callback: () => {
        // eslint-disable-next-line no-use-before-define
        unlock();
        window.history.go(-2);
      },
    });
  }
}

function handleBeforeUnload(event) {
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

export function checkLock(event) {
  const { target } = event;
  const image = document.querySelector(".image-content__preview").firstChild;
  const title = document.querySelector(".image-content__title").value;
  const desc = document.querySelector(".image-content__desc").value;

  if (target.value) {
    lock();
    return;
  }

  if (image || title || desc) return;

  unlock();
}
