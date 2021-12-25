import instance from "./instance";

export async function getPostListData(
  wide: string,
  local: string,
  page = 1,
): Promise<PostListResponse | InstanceError> {
  if (!wide || !local) return instance.error("올바른 주소가 아닙니다");
  const apiUri = `/posts?wide=${wide}&local=${local}&page=${page}`;
  if (window.user?.token)
    return instance.get(apiUri, {
      headers: {
        Authorization: `Bearer ${window.user?.token}`,
      },
    });

  return instance.get(apiUri);
}

export async function getPostData(
  id: string,
): Promise<PostDetailResponse | InstanceError> {
  const apiUri = `/posts/${id}`;
  if (window.user?.token)
    return instance.get(apiUri, {
      headers: {
        Authorization: `Bearer ${window.user?.token}`,
      },
    });
  return instance.get(`/posts/${id}`);
}

export async function createPostData(
  body: FormData,
): Promise<PostCreateResponse | InstanceError> {
  return instance.post("/posts/", {
    headers: {
      Authorization: `Bearer ${window.user?.token}`,
    },
    body,
  });
}

export async function getAllPost(
  page = 1,
): Promise<PostListResponse | InstanceError> {
  return instance.get(`/posts/all?page=${page}`);
}

export async function deletePost(
  postId: string,
): Promise<PostDeleteResponse | InstanceError> {
  return instance.delete(`/posts/${postId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.user?.token}`,
    },
  });
}

export async function editPostData(
  postId: string,
  body: {
    title: string;
    contents: string;
  },
): Promise<PostModifyResponse | InstanceError> {
  return instance.put(`/posts/${postId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${window.user?.token}`,
    },
    body: JSON.stringify(body),
  });
}
