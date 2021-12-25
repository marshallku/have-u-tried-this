import instance from "./instance";

export default async function getLocationListData(
  page = 1,
): Promise<ILocationList | InstanceError> {
  return instance.get(`/locations?page=${page}`);
}
