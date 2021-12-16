/* eslint-disable import/extensions */
import { Location } from "../models/index.js";

export async function getAll() {
  const locations = await Location.find({
    posts: { $type: "array" },
  }).populate("posts");
  const parsedLocations = locations.map((location) => {
    const data = {
      wideAddr: location.wideAddr,
      localAddr: location.localAddr,
      photo: location.posts[0].photos[0].url,
    };
    return data;
  });

  return parsedLocations;
}

export async function validation(location) {
  const { wideAddr, localAddr } = location;
  const check = await Location.findOne({ wideAddr, localAddr });
  return check;
}
