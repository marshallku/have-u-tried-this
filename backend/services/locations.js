const { Location, Post } = require("../models");

module.exports = {
  getAll: async () => {
    const posts = await Post.find({});
    const result = posts.reduce((prev, curr) => {
      const key = curr.location.wide_addr + " " + curr.location.local_addr;
      if (!prev[key]) {
        const value = {
          wide_addr: curr.location.wide_addr,
          local_addr: curr.location.local_addr,
          photo: curr.photos[0].url,
          likes: curr.likes,
        };
        prev[key] = value;
      } else {
        if (prev[key].likes < curr.likes) {
          prev[key].photo = curr.photos[0].url;
          prev[key].likes = curr.likes;
        }
      }
      return prev;
    }, {});

    return Object.values(result);
  },

  validation: async (location) => {
    const { wide_addr, local_addr } = location;
    return await Location.findOne({ wide_addr, local_addr });
  },
};
