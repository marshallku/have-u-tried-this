import { Post, Bookmark } from "../models";

async function updateLikes(postId, count) {
  await Post.findByIdAndUpdate(postId, {
    $inc: { likes: count },
  });
}

export async function pushLike(authorId, postId) {
  const bookmark = await Bookmark.findOne({ post: postId, user: authorId });
  if (bookmark) {
    throw new Error("잘못된 접근입니다.");
  }
  try {
    updateLikes(postId, 1);
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
    updateLikes(postId, -1);
  } catch (err) {
    throw new Error("잘못된 접근입니다.");
  }
  const bookmark = await Bookmark.findOneAndDelete({
    post: postId,
    user: authorId,
  });
  if (!bookmark) {
    throw new Error("잘못된 접근입니다.");
  }
}
