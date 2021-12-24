import instance from "./instance";

export async function getUserPostData(userId, page = 1) {
  return instance.get(`/users/${userId}/posts?page=${page}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.user?.token}`,
    },
  });
}

export async function getUserLikeData(userId, page = 1) {
  return instance.get(`/users/${userId}/likes?page=${page}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.user?.token}`,
    },
  });
}

export async function getUserCommentData(userId, page = 1) {
  return instance.get(`/users/${userId}/comments?page=${page}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.user?.token}`,
    },
  });
}
