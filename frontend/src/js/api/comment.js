import instance from "./instance";

export default async function getCommentList(postId, page = 1) {
  return instance.get(`/posts/${postId}/comments?page=${page}`);
}
