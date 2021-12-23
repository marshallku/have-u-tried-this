export default class Post {
  title;

  contents;

  photos;

  wideAddr;

  localAddr;

  authorId;

  constructor(title, contents, photos, wideAddr, localAddr, authorId) {
    this.title = title;
    this.contents = contents;
    this.photos = photos;
    this.wideAddr = wideAddr;
    this.localAddr = localAddr;
    this.authorId = authorId;
  }
}
