const { Post } = require("../models");
const asyncHandler = require("../utils/async-handler");

module.exports = {
  getAll: async (addr) => {
    const posts = await Post.find({ location: addr });
    return posts.map((post) => {
      return {
        id: post.id,
        wide_addr: post.location.wide_addr,
        local_addr: post.location.local_addr,
        photo: post.photos[0].url,
        title: post.title,
        likes: post.likes,
      };
    });
  },

  createPost: async (postDto) => {
    const { photos, ...rest } = postDto;
    const post = {
      ...rest,
      photos: postDto.photos.reduce((prev, curr) => {
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
    try {
      const post = await Post.findOne({ _id: id });
      return post;
    } catch (err) {
      throw new Error("No data");
    }
  },
};
