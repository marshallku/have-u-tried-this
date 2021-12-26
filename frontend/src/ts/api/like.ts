import instance from "./instance";

export async function addLike(
  postId: string,
): Promise<LikeAddResponse | InstanceError> {
  return instance.post(`/posts/${postId}/like`, {
    headers: {
      Authorization: `Bearer ${window.user?.token}`,
    },
  });
}

export async function removeLike(postId: string): Promise<any> {
  return instance.delete(`/posts/${postId}/like`, {
    headers: {
      Authorization: `Bearer ${window.user?.token}`,
    },
  });
}
