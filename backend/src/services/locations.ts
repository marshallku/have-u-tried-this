/* eslint-disable import/extensions */
import { Location } from "../models/index";
import setPagination from "../utils/pagination";
import { ILocation } from "../models/schemas/Location";

export async function getAll(page: number, perPage: number) {
  // 페이지네이션
  const condition = {
    $nor: [{ posts: { $exists: false } }, { posts: { $size: 0 } }],
  };
  const pagination = await setPagination(Location, condition, page, perPage);

  // posts가 없는 로케이션, posts가 있어도 size가 0인 경우 제외
  const locations = await Location.find(condition)
    .skip((page - 1) * perPage)
    .limit(perPage)
    .populate("posts");

  // api 명세에 맞게 데이터 파싱
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
    pagination,
  };
}

export async function validation(
  location: Omit<ILocation, "posts" | "createdAt" | "updatedAt">,
) {
  const { wideAddr, localAddr } = location;
  const check = await Location.findOne({ wideAddr, localAddr });
  return check;
}

export async function getAllLocations() {
  const locations = await Location.find({});
  return locations.reduce((prev, curr) => {
    const key = curr.wideAddr;
    if (!prev[key]) {
      // eslint-disable-next-line no-param-reassign
      prev[key] = [];
      prev[key].push(curr.localAddr);
    } else {
      prev[key].push(curr.localAddr);
    }
    return prev;
  }, {});
}
