/* eslint-disable import/extensions */
import { Post } from "../models/index.js";

export async function getAll(addr) {
  const posts = await Post.find({ location: addr });
  return posts.map((post) => {
    const data = {
      id: post.id,
      wideAddr: post.location.wideAddr,
      localAddr: post.location.localAddr,
      photo: post.photos[0].url,
      title: post.title,
      likes: post.likes,
    };
    return data;
  });
}
export async function createPost(postDto) {
  const { photos, ...rest } = postDto;
  const post = {
    ...rest,
    photos: postDto.photos.reduce((prev, curr) => {
      prev.push({
        url: curr.filename,
        text: postDto.title,
      });
      return prev;
    }, []),
  };

  const postId = Post.create(post);
  return postId;
}
export async function findById(id) {
  try {
    const post = await Post.findById(id);
    return post;
  } catch (err) {
    throw new Error("No data");
  }
}
export async function findByTitle(_title) {
  const post = await Post.findOne({ title: _title });
  return post;
}
