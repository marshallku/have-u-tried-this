import instance from "./instance";

export async function getUserPostData(userId, page = 1) {
  return instance.get(`/user/${userId}/posts?page=${page}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.user?.token}`,
    },
  });
}

export async function getUserLikeData(userId, page = 1) {
  return instance.get(`/user/${userId}/likes?page=${page}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.user?.token}`,
    },
  });
}

export async function getUserCommentData(userId, page = 1) {
  return instance.get(`/user/${userId}/comments?page=${page}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.user?.token}`,
    },
  });
}
