import instance from "./instance";

export default async function fetchLocationListData(page = 1) {
  return instance.get(`/locations?page=${page}`);
}
