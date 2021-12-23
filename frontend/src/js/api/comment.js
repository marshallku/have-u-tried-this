import instance from "./instance";

export async function getCommentList(postId, page = 1) {
  return instance.get(`/posts/${postId}/comments?page=${page}`);
}

export async function postComment(postId, contents) {
  return instance.post(`/posts/${postId}/comments`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.user?.token}`,
    },
    body: JSON.stringify({ contents }),
  });
}

export async function deleteComment(postId, commentId) {
  return instance.delete(`/posts/${postId}/comments/${commentId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.user?.token}`,
    },
  });
}
