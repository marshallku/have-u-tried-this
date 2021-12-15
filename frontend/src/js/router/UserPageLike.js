export default class UserPageLike {
  constructor({ $target, initialState }) {
    this.state = initialState;
    this.$target = $target;
  }

  setState(nextState) {
    this.state = nextState;
    this.state.type === "like" && this.render();
  }

  render() {
    const likes = this.state.likes
      .map(
        (like) => `
          <article class="post-item">
            <a href='/'>
              <figure class="post-item__thumbnail">
                <img src=${like.photo} alt="">
              </figure>
              <header class="post-item__header">
                <h2 class="post-item__title">${like.title}</h2>
                <div class="post-item__info">
                <div class="post-item__location">${
                  like.local_addr
                    ? like.wide_addr + " " + like.local_addr
                    : like.wide_addr
                }</div>
                  <div>
                    <span>💜 </span>
                    <span>${like.likes}</span>
                  </div>
                </div>
              </header>
            </a>
          </article>`,
      )
      .join("");
    this.$target.innerHTML =
      this.state.likes.length > 0
        ? `
      <h1 class="main__title">추천한 게시물</h1>
        <div class="grid-container" style="width: auto">
          ${likes}
        </div>`
        : `<h1 class="main__title">추천한 게시물</h1>
          <div class="empty">
            <p>empty.</p>
          </div>`;
  }
}
