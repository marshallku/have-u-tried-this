const { Post } = require("../models");

module.exports = {
  getAll: async (addr) => {
    const posts = await Post.find({ location: addr });
    return posts.map((post) => {
      return {
        id: post.id,
        wide_addr: post.location.wide_addr,
        local_addr: post.location.local_addr,
        pictures: post.pictures[0].url,
        title: post.title,
        likes: post.likes,
      };
    });
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

  findOne: async (id) => {
    const post = await Post.findOne({ _id: id });
    return post;
  },
};
