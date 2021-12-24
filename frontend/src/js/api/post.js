import instance from "./instance";

export async function getPostListData(wide, local, page = 1) {
  if (!wide || !local) return instance.error("올바른 주소가 아닙니다");
  return instance.get(`/posts?wide=${wide}&local=${local}&page=${page}`);
}

export async function getPostData(id) {
  return instance.get(`/posts/${id}`);
}

export async function getAllPost(page = 1) {
  return instance.get(`/posts/all?page=${page}`);
}

export async function deletePost(postId) {
  return instance.delete(`/posts/${postId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.user?.token}`,
    },
  });
}

export async function editPostData(postId, body) {
  return instance.put(`/posts/${postId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.user?.token}`,
    },
    body: JSON.stringify(body),
  });
}
