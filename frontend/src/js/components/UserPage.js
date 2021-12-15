import UserPageInfo from "../router/UserPageInfo.js";
import UserPagePost from "../router/UserPagePost.js";
import UserPageComment from "../router/UserPageComment.js";
import UserPageLike from "../router/UserPageLike.js";

export default class UserPage {
  constructor({ $app, api }) {
    this.api = api;
    this.state = {
      type: "info",
      info: null,
      posts: [],
      comments: [],
      likes: [],
    };

    // navigation
    this.$nav = document.createElement("nav");
    this.$nav.className = "nav";
    $app.appendChild(this.$nav);

    // main
    this.$main = document.createElement("div");
    this.$main.className = "main";
    $app.appendChild(this.$main);

    // userPage nav-click-handler
    this.$nav.addEventListener("click", (e) => {
      if (e.target.closest(".nav__info")) return this.onClickInfo();
      if (e.target.closest(".nav__post")) return this.onClickPost();
      if (e.target.closest(".nav__comment")) return this.onClickComment();
      if (e.target.closest(".nav__like")) return this.onClickLike();
    });

    this.userPageInfo = new UserPageInfo({
      $target: this.$main,
      initialState: this.state,
    });

    this.userPagePost = new UserPagePost({
      $target: this.$main,
      initialState: this.state,
    });

    this.userPageComment = new UserPageComment({
      $target: this.$main,
      initialState: this.state,
      onClickFix: () => this.onClickFix(),
      onClickClose: () => this.onClickClose(),
    });

    this.userPageLike = new UserPageLike({
      $target: this.$main,
      initialState: this.state,
    });

    this.init();
  }

  setState(nextState) {
    this.state = nextState;
    this.userPageInfo.setState(this.state);
    this.userPagePost.setState(this.state);
    this.userPageComment.setState(this.state);
    this.userPageLike.setState(this.state);
  }

  async onClickInfo() {
    this.setState({
      ...this.state,
      type: "info",
    });
  }

  async onClickPost() {
    const data = await this.api.fetchPostListData();
    this.setState({
      ...this.state,
      type: "post",
      posts: data,
    });
  }

  async onClickComment() {
    this.setState({
      ...this.state,
      type: "comment",
      comments: [
        {
          store: "혼밥하기 좋은곳",
          comment:
            "친구는 세월의 도둑이다. 봄부터 흐르는 물은 겨울이 되어도 얼지 않듯이 마음에서 우러나오는 우적은 역경이 닥친다고 해서 식지않는다. 불행했을 때 만난 친구는 가장 소중히 여겨야 한다. 행복했을 때 함께 기쁨을 누리는 친구보다 힘들 떄 슬픔을 덜어지는 친구를 더 많이 신뢰할 수 있다. 부유했을 때는 친구를 사귀기 쉽지만, 어려울 때는 눈을 씻고 찾아봐도 친구를 찾기 어렵다. 누군가 진정한 우정을 나누고 있다 할지라도 그 우정을 지키려면 오랜 시간이 걸린다. 짧은 시간 안에 많은 친구를 얻기란 불가능하다. 왜냐하면 그들은 진정한 친구가 아니기 때문이다. 친구란 말하자면 또 하나의 자신이다. 친구를 보면 그 사람을 알 수 있다. 현명한 사람과 어리석은 사람은 서로 어울리지 않는다. 친구는 나를 동정하는 자가 아니라 나를 돕는 자다. 서로가 고통을 덜어 주지 않는다면 우리는 무엇을 위해 사는 것일까? 우리는 모두 적막한 세계를 떠도는 나그네다. 그 여정에서 찾을 수 있는 최고의 선물은 바로 믿음직한 벗이다. 좋은 벗은 충격을 덜어주는 완충장치와도 같은 것이며 인생의 길에서 충동을 피할 수 있도록 도와준다. 우정만이 세상을 하나로 만들 수 있다. 우정은 영혼의 결혼이다. 간담상조(肝膽相照) 간과 쓸개를 드러내 보인다는 절친한 사이다. 관포지교(管鮑之交) 관숙과 포숙아의 사귐, 변함없는 돈독한 우정.",
        },
        {
          store: "혼밥하기 좋은곳",
          comment:
            "친구는 세월의 도둑이다. 봄부터 흐르는 물은 겨울이 되어도 얼지 않듯이 마음에서 우러나오는 우적은 역경이 닥친다고 해서 식지않는다. 불행했을 때 만난 친구는 가장 소중히 여겨야 한다. 행복했을 때 함께 기쁨을 누리는 친구보다 힘들 떄 슬픔을 덜어지는 친구를 더 많이 신뢰할 수 있다. 부유했을 때는 친구를 사귀기 쉽지만, 어려울 때는 눈을 씻고 찾아봐도 친구를 찾기 어렵다. 누군가 진정한 우정을 나누고 있다 할지라도 그 우정을 지키려면 오랜 시간이 걸린다. 짧은 시간 안에 많은 친구를 얻기란 불가능하다. 왜냐하면 그들은 진정한 친구가 아니기 때문이다. 친구란 말하자면 또 하나의 자신이다. 친구를 보면 그 사람을 알 수 있다. 현명한 사람과 어리석은 사람은 서로 어울리지 않는다. 친구는 나를 동정하는 자가 아니라 나를 돕는 자다. 서로가 고통을 덜어 주지 않는다면 우리는 무엇을 위해 사는 것일까? 우리는 모두 적막한 세계를 떠도는 나그네다. 그 여정에서 찾을 수 있는 최고의 선물은 바로 믿음직한 벗이다. 좋은 벗은 충격을 덜어주는 완충장치와도 같은 것이며 인생의 길에서 충동을 피할 수 있도록 도와준다. 우정만이 세상을 하나로 만들 수 있다. 우정은 영혼의 결혼이다. 간담상조(肝膽相照) 간과 쓸개를 드러내 보인다는 절친한 사이다. 관포지교(管鮑之交) 관숙과 포숙아의 사귐, 변함없는 돈독한 우정.",
        },
        {
          store: "혼밥하기 좋은곳",
          comment:
            "친구는 세월의 도둑이다. 봄부터 흐르는 물은 겨울이 되어도 얼지 않듯이 마음에서 우러나오는 우적은 역경이 닥친다고 해서 식지않는다. 불행했을 때 만난 친구는 가장 소중히 여겨야 한다. 행복했을 때 함께 기쁨을 누리는 친구보다 힘들 떄 슬픔을 덜어지는 친구를 더 많이 신뢰할 수 있다. 부유했을 때는 친구를 사귀기 쉽지만, 어려울 때는 눈을 씻고 찾아봐도 친구를 찾기 어렵다. 누군가 진정한 우정을 나누고 있다 할지라도 그 우정을 지키려면 오랜 시간이 걸린다. 짧은 시간 안에 많은 친구를 얻기란 불가능하다. 왜냐하면 그들은 진정한 친구가 아니기 때문이다. 친구란 말하자면 또 하나의 자신이다. 친구를 보면 그 사람을 알 수 있다. 현명한 사람과 어리석은 사람은 서로 어울리지 않는다. 친구는 나를 동정하는 자가 아니라 나를 돕는 자다. 서로가 고통을 덜어 주지 않는다면 우리는 무엇을 위해 사는 것일까? 우리는 모두 적막한 세계를 떠도는 나그네다. 그 여정에서 찾을 수 있는 최고의 선물은 바로 믿음직한 벗이다. 좋은 벗은 충격을 덜어주는 완충장치와도 같은 것이며 인생의 길에서 충동을 피할 수 있도록 도와준다. 우정만이 세상을 하나로 만들 수 있다. 우정은 영혼의 결혼이다. 간담상조(肝膽相照) 간과 쓸개를 드러내 보인다는 절친한 사이다. 관포지교(管鮑之交) 관숙과 포숙아의 사귐, 변함없는 돈독한 우정.",
        },
        {
          store: "혼밥하기 좋은곳",
          comment:
            "친구는 세월의 도둑이다. 봄부터 흐르는 물은 겨울이 되어도 얼지 않듯이 마음에서 우러나오는 우적은 역경이 닥친다고 해서 식지않는다. 불행했을 때 만난 친구는 가장 소중히 여겨야 한다. 행복했을 때 함께 기쁨을 누리는 친구보다 힘들 떄 슬픔을 덜어지는 친구를 더 많이 신뢰할 수 있다. 부유했을 때는 친구를 사귀기 쉽지만, 어려울 때는 눈을 씻고 찾아봐도 친구를 찾기 어렵다. 누군가 진정한 우정을 나누고 있다 할지라도 그 우정을 지키려면 오랜 시간이 걸린다. 짧은 시간 안에 많은 친구를 얻기란 불가능하다. 왜냐하면 그들은 진정한 친구가 아니기 때문이다. 친구란 말하자면 또 하나의 자신이다. 친구를 보면 그 사람을 알 수 있다. 현명한 사람과 어리석은 사람은 서로 어울리지 않는다. 친구는 나를 동정하는 자가 아니라 나를 돕는 자다. 서로가 고통을 덜어 주지 않는다면 우리는 무엇을 위해 사는 것일까? 우리는 모두 적막한 세계를 떠도는 나그네다. 그 여정에서 찾을 수 있는 최고의 선물은 바로 믿음직한 벗이다. 좋은 벗은 충격을 덜어주는 완충장치와도 같은 것이며 인생의 길에서 충동을 피할 수 있도록 도와준다. 우정만이 세상을 하나로 만들 수 있다. 우정은 영혼의 결혼이다. 간담상조(肝膽相照) 간과 쓸개를 드러내 보인다는 절친한 사이다. 관포지교(管鮑之交) 관숙과 포숙아의 사귐, 변함없는 돈독한 우정.",
        },
        {
          store: "혼밥하기 좋은곳",
          comment:
            "친구는 세월의 도둑이다. 봄부터 흐르는 물은 겨울이 되어도 얼지 않듯이 마음에서 우러나오는 우적은 역경이 닥친다고 해서 식지않는다. 불행했을 때 만난 친구는 가장 소중히 여겨야 한다. 행복했을 때 함께 기쁨을 누리는 친구보다 힘들 떄 슬픔을 덜어지는 친구를 더 많이 신뢰할 수 있다. 부유했을 때는 친구를 사귀기 쉽지만, 어려울 때는 눈을 씻고 찾아봐도 친구를 찾기 어렵다. 누군가 진정한 우정을 나누고 있다 할지라도 그 우정을 지키려면 오랜 시간이 걸린다. 짧은 시간 안에 많은 친구를 얻기란 불가능하다. 왜냐하면 그들은 진정한 친구가 아니기 때문이다. 친구란 말하자면 또 하나의 자신이다. 친구를 보면 그 사람을 알 수 있다. 현명한 사람과 어리석은 사람은 서로 어울리지 않는다. 친구는 나를 동정하는 자가 아니라 나를 돕는 자다. 서로가 고통을 덜어 주지 않는다면 우리는 무엇을 위해 사는 것일까? 우리는 모두 적막한 세계를 떠도는 나그네다. 그 여정에서 찾을 수 있는 최고의 선물은 바로 믿음직한 벗이다. 좋은 벗은 충격을 덜어주는 완충장치와도 같은 것이며 인생의 길에서 충동을 피할 수 있도록 도와준다. 우정만이 세상을 하나로 만들 수 있다. 우정은 영혼의 결혼이다. 간담상조(肝膽相照) 간과 쓸개를 드러내 보인다는 절친한 사이다. 관포지교(管鮑之交) 관숙과 포숙아의 사귐, 변함없는 돈독한 우정.",
        },
      ],
    });
  }

  async onClickLike() {
    const data = await this.api.fetchPostListData();

    this.setState({
      ...this.state,
      type: "like",
      likes: data,
    });
  }

  async onClickFix() {}

  async onClickClose() {
    // 유저 코맨트 id값을 받아서 filtering
  }

  async init() {
    const res = await this.api.fetchUserData();
    const info = res;

    this.state.info = info;

    this.render();
  }

  render() {
    this.$nav.innerHTML = `
      <ul>
        <div class="nav__photo">
          <img
            src=${this.state.info.profile}
          />
        </div>
        <li class="nav__info">내 정보</li>
        <li class="nav__post">작성글 목록</li>
        <li class="nav__comment">작성 댓글 보기</li>
        <li class="nav__like">추천한 게시물</li>
      </ul>`;
  }
}
