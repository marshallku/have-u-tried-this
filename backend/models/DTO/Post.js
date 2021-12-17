export default class Post {
  postId;

  title;

  content;

  photos;

  wideAddr;

  localAddr;

  constructor(title, content, photos, wideAddr, localAddr, postId = undefined) {
    this.postId = postId;
    this.title = title;
    this.content = content;
    this.photos = photos;
    this.wideAddr = wideAddr;
    this.localAddr = localAddr;
  }
}
