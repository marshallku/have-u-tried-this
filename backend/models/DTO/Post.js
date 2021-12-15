export default class Post {
  title;

  content;

  photos;

  location;

  constructor(title, content, photos, wideAddr, localAddr) {
    this.title = title;
    this.content = content;
    this.photos = photos;
    this.location = {
      wideAddr,
      localAddr,
    };
  }
}
