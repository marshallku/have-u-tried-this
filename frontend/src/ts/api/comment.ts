import instance from "./instance";

export async function getCommentList(
  postId: string,
  page = 1,
): Promise<CommentListResponse | InstanceError> {
  return instance.get(`/posts/${postId}/comments?page=${page}`);
}

export async function postComment(
  postId: string,
  contents: string,
): Promise<CommentCreateResponse | InstanceError> {
  return instance.post(`/posts/${postId}/comments`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.user?.token}`,
    },
    body: JSON.stringify({ contents }),
  });
}

export async function deleteComment(
  postId: string,
  commentId: string,
): Promise<any> {
  return instance.delete(`/posts/${postId}/comments/${commentId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.user?.token}`,
    },
  });
}
