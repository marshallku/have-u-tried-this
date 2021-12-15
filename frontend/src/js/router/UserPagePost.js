export default class UserPagePost {
  constructor({ $target, initialState }) {
    this.state = initialState;
    this.$target = $target;
  }

  setState(nextState) {
    this.state = nextState;
    this.state.type === "post" && this.render();
  }

  render() {
    const posts = this.state.posts
      .map(
        (post) => `
          <article class="post-item">
            <a href='/'>
              <figure class="post-item__thumbnail">
                <img src=${post.photo} alt="">
              </figure>
              <header class="post-item__header">
                <h2 class="post-item__title">${post.title}</h2>
                <div class="post-item__info">
                  <div class="post-item__location">${
                    post.local_addr
                      ? post.wide_addr + " " + post.local_addr
                      : post.wide_addr
                  }</div>
                  <div>
                    <span>💜 </span>
                    <span>${post.likes}</span>
                  </div>
                </div>
              </header>
            </a>
          </article>`,
      )
      .join("");
    this.$target.innerHTML =
      this.state.posts.length > 0
        ? `
      <h1 class="main__title">내 글 목록</h1>
        <div class="grid-container" style="width: auto">
          ${posts}
        </div>`
        : `<h1 class="main__title">내 글 목록</h1>
          <div class="empty">
            <p>empty.</p>
          </div>`;
  }
}
