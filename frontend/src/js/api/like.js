import instance from "./instance";

export async function addLike(postId) {
  return instance.post(`/posts/${postId}/like`, {
    headers: {
      Authorization: `Bearer ${window.user?.token}`,
    },
  });
}

export async function removeLike(postId) {
  return instance.delete(`/posts/${postId}/like`, {
    headers: {
      Authorization: `Bearer ${window.user?.token}`,
    },
  });
}
