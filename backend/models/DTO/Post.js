export default class Post {
  title;

  content;

  photos;

  wideAddr;

  localAddr;

  authorId;

  constructor(title, content, photos, wideAddr, localAddr, authorId) {
    this.title = title;
    this.content = content;
    this.photos = photos;
    this.wideAddr = wideAddr;
    this.localAddr = localAddr;
    this.authorId = authorId;
  }
}
