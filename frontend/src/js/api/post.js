import instance from "./instance";

export async function getPostListData(wide, local, page = 1) {
  if (!wide || !local) return instance.error("올바른 주소가 아닙니다");
  return instance.get(`/posts?wide=${wide}&local=${local}&page=${page}`);
}

export async function getPostData(id) {
  return instance.get(`/posts/${id}`);
}
