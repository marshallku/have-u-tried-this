/* eslint-disable import/extensions */
import { Post, Bookmark } from "../models/index";

async function updateLikes(postId: string, count: number) {
  await Post.findByIdAndUpdate(postId, {
    $inc: { likes: count },
  });
}

export async function checkLike(authorId: string, postId: string) {
  const bookmark = await Bookmark.findOne({ authorId, postId });
  return !!bookmark;
}

export async function pushLike(authorId: string, postId: string) {
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

export async function pushUnlike(authorId: string, postId: string) {
  try {
    const likeCount = await Post.findById(postId);
    if (likeCount.likes <= 0) {
      throw new Error("잘못된 접근입니다.");
    }
    await updateLikes(postId, -1);

    await Bookmark.findOneAndDelete({
      post: postId,
      user: authorId,
    });
  } catch (err) {
    throw new Error("잘못된 접근입니다.");
  }
}
