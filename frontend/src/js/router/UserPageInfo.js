export default class UserPageInfo {
  constructor({ $target, initialState }) {
    this.state = initialState;
    this.$target = $target;
  }

  setState(nextState) {
    this.state = nextState;
    this.state.type === "info" && this.render();
  }

  render() {
    this.$target.innerHTML = `
      <h1 class="main__title">내 정보</h1>`;
  }
}
