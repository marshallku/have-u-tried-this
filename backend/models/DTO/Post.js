module.exports = class Post {
  title;
  content;
  pictures;
  location;

  constructor(title, content, pictures, wide_addr, local_addr) {
    this.title = title;
    this.content = content;
    this.pictures = pictures;
    this.location = {
      wide_addr: wide_addr,
      local_addr: local_addr,
    };
  }
};
