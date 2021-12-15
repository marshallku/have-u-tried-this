export default class UserPageComment {
  constructor({ $target, initialState }) {
    this.state = initialState;
    this.$target = $target;

    this.$target.addEventListener("click", (e) => {
      const fix = e.target.closest(".main__list--fix");
      if (fix) {
        if (fix.innerText === "수정하기") {
          fix.innerText = "확인";
        } else {
          fix.innerText = "수정하기";
        }
      }
    });
  }

  setState(nextState) {
    this.state = nextState;
    this.state.type === "comment" && this.render();
  }

  render() {
    const comments = this.state.comments
      .map(
        (comment, idx) => `
      <li class="main__list">
        <div>
          <h2 class="main__list--name">${comment.store}</h2>
          <p class="main__list--comment">
            ${comment.comment}
          </p>
          <button class="main__list--fix" data-index=${idx}>수정하기</button>
          <button class="main__list--close">X</button>
        </div>
      </li>`,
      )
      .join("");
    this.$target.innerHTML =
      this.state.comments.length > 0
        ? `
      <h1 class="main__title">내가 작성한 댓글</h1>
        <ul>
          ${comments}
        </ul>`
        : `<h1 class="main__title">내가 작성한 댓글</h1>
            <div class="empty">
              <p>empty.</p>
            </div>`;
  }
}
