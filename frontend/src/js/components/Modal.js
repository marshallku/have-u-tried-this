import "../../css/Modal.css";

export default function Modal(author, content) {
  const backdrop = document.createElement("div");
  const modal = document.createElement("div");
  const modalContent = document.createElement("div");
  const title = document.createElement("div");
  const text = document.createElement("div");
  const text2 = document.createElement("div");
  const button = document.createElement("div");
  const yes = document.createElement("button");
  const no = document.createElement("button");

  backdrop.classList.add("backdrop");
  modal.classList.add("modal");
  modalContent.classList.add("modal__content");
  title.classList.add("modal__title");
  button.classList.add("modal__button");

  text.innerText = "삭제하면 되돌릴 수 없어요!";
  text2.innerText = "그래도 삭제하시겠습니까?";
  yes.innerText = "네, 삭제할게요";
  no.innerText = "아니요, 안할래요";

  title.append(text, text2);
  button.append(no, yes);

  modalContent.append(title, button);
  modal.append(modalContent);
  backdrop.append(modal);

  backdrop.addEventListener("click", () => {
    backdrop.remove();
  });

  no.addEventListener("click", () => {
    backdrop.remove();
  });

  yes.addEventListener("click", () => {
    console.log(author, content);
    // api request delete post
  });

  return backdrop;
}
