import { Location, Post } from "../models";

export async function getAll() {
  const posts = await Post.find({});
  const result = posts.reduce((prev, curr) => {
    const key = curr.location.wideAddr + curr.location.localAddr;
    if (!prev[key]) {
      const value = {
        wideAddr: curr.location.wideAddr,
        localAddr: curr.location.localAddr,
        photo: curr.photos[0].url,
        likes: curr.likes,
      };
      // eslint-disable-next-line no-param-reassign
      prev[key] = value;
    } else if (prev[key].likes < curr.likes) {
      // eslint-disable-next-line no-param-reassign
      prev[key].photo = curr.photos[0].url;
      // eslint-disable-next-line no-param-reassign
      prev[key].likes = curr.likes;
    }
    return prev;
  }, {});

  return Object.values(result);
}
export async function validation(location) {
  const { wideAddr, localAddr } = location;
  const check = await Location.findOne({ wideAddr, localAddr });
  return check;
}
