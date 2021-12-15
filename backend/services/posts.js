const { Post } = require("../models");

module.exports = {
  getAll: async (addr) => {
    const posts = await Post.find({ location: addr });
    return posts;
  },

  createPost: async (postDto) => {
    // 이미지 사이즈 20MB -> 20000
    // 이미지 확장자 mimetype image/jpeg
    const { pictures, ...rest } = postDto;
    const post = {
      ...rest,
      pictures: postDto.pictures.reduce((prev, curr) => {
        prev.push({
          url: curr.filename,
          text: postDto.title,
        });
        return prev;
      }, []),
    };

    const postId = Post.create(post);
    return postId;
  },
};
