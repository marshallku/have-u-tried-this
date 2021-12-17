/* eslint-disable import/extensions */
import { Location } from "../models/index.js";

export async function getAll(page, perPage) {
  const total = await Location.find({
    posts: { $type: "array" },
  }).countDocuments();
  const totalPage = Math.ceil(total / perPage);

  const locations = await Location.find({ posts: { $type: "array" } })
    .sort({ wideAddr: -1 })
    .skip((page - 1) * perPage)
    .limit(perPage)
    .populate("posts");
  const parsedLocations = locations.map((location) => {
    const data = {
      wideAddr: location.wideAddr,
      localAddr: location.localAddr,
      photo: location.posts[0].photos[0].url,
    };
    return data;
  });

  return {
    data: parsedLocations,
    pagination: {
      page,
      perPage,
      totalPage,
    },
  };
}

export async function validation(location) {
  const { wideAddr, localAddr } = location;
  const check = await Location.findOne({ wideAddr, localAddr });
  return check;
}
