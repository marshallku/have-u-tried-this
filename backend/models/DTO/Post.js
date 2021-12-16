export default class Post {
  title;

  content;

  photos;

  wideAddr;

  localAddr;

  constructor(title, content, photos, wideAddr, localAddr) {
    this.title = title;
    this.content = content;
    this.photos = photos;
    this.wideAddr = wideAddr;
    this.localAddr = localAddr;
  }
}
