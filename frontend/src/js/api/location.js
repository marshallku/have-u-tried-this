import instance from "./instance";

export default async function getLocationListData(page = 1) {
  return instance.get(`/locations?page=${page}`);
}
