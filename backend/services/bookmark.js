/* eslint-disable import/extensions */
import { Post, Bookmark } from "../models/index.js";

async function updateLikes(postId, count) {
  await Post.findByIdAndUpdate(postId, {
    $inc: { likes: count },
  });
}

export async function checkLike(authorId, postId) {
  const bookmark = await Bookmark.findOne({ authorId, postId });
  return !!bookmark;
}

export async function pushLike(authorId, postId) {
  try {
    await Bookmark.findOne({ post: postId, user: authorId });

    await updateLikes(postId, 1);
  } catch (err) {
    throw new Error("잘못된 접근입니다.");
  }

  await Bookmark.create({
    post: postId,
    user: authorId,
  });
}

export async function pushUnlike(authorId, postId) {
  try {
    await updateLikes(postId, -1);

    await Bookmark.findOneAndDelete({
      post: postId,
      user: authorId,
    });
  } catch (err) {
    throw new Error("잘못된 접근입니다.");
  }
}
