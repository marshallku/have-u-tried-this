import instance from "./instance";

export async function getUserPostData(
  userId: string,
  page = 1,
): Promise<PostListResponse | InstanceError> {
  return instance.get(`/users/${userId}/posts?page=${page}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.user?.token}`,
    },
  });
}

export async function getUserLikeData(
  userId: string,
  page = 1,
): Promise<PostListResponse | InstanceError> {
  return instance.get(`/users/${userId}/likes?page=${page}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.user?.token}`,
    },
  });
}

export async function getUserCommentData(
  userId: string,
  page = 1,
): Promise<UserCommentListResponse | InstanceError> {
  return instance.get(`/users/${userId}/comments?page=${page}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.user?.token}`,
    },
  });
}
