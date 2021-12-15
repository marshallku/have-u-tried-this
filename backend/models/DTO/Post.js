module.exports = class Post {
  title;
  content;
  photos;
  location;

  constructor(title, content, photos, wide_addr, local_addr) {
    this.title = title;
    this.content = content;
    this.photos = photos;
    this.location = {
      wide_addr: wide_addr,
      local_addr: local_addr,
    };
  }
};
