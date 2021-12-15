const { Post } = require("../models");

module.exports = {
  getAll: async () => {
    const posts = await Post.find({}).populate("location");
    const result = posts.reduce((prev, curr) => {
      const key = curr.location.wide_addr + " " + curr.location.local_addr;
      if (!prev[key]) {
        const value = {
          wide_addr: curr.location.wide_addr,
          local_addr: curr.location.local_addr,
          picture: curr.pictures[0].url,
          likes: curr.likes,
        };
        prev[key] = value;
      } else {
        if (prev[key].likes < curr.likes) {
          prev[key].picture = curr.pictures[0].url;
          prev[key].likes = curr.likes;
        }
      }
      return prev;
    }, {});

    return Object.values(result);
  },
};
