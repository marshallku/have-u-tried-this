/* eslint-disable import/extensions */
import { Comment, Post, User } from "../models/index";

export async function getComments(
  postId: string,
  page: number,
  perPage: number,
) {
  try {
    // 포스트 불러오기, 댓글 붙여서
    const post = await Post.findById(postId).populate("comments");

    // 댓글 총 갯수, 10개씩 페이지, 배열이니 slice로 자르기
    const total = post.comments.length;
    const totalPage = Math.ceil(total / perPage);
    const startIndex = (page - 1) * perPage;
    const endIndex =
      startIndex + perPage < total ? startIndex + perPage : total;
    const slicedComment = post.comments
      .sort((p1, p2) => p2.createdAt.getTime() - p1.createdAt.getTime())
      .slice(startIndex, endIndex);

    await User.populate(slicedComment, { path: "author" });
    return {
      comments: slicedComment,
      pagination: {
        page,
        nextPage: page < totalPage,
      },
    };
  } catch (err) {
    throw new Error("잘못된 접근입니다.");
  }
}

export async function createComment(
  postId: string,
  userId: string,
  contents: string,
) {
  const comment = new Comment({
    author: userId,
    post: postId,
    contents,
  });
  try {
    await Post.findByIdAndUpdate(postId, {
      $push: {
        comments: comment,
      },
    });
  } catch (err) {
    throw new Error("잘못된 접근입니다.");
  }
  comment.save();
  await User.populate(comment, { path: "author" });
  return comment;
}

export async function deleteComment(
  postId: string,
  commentId: string,
  userId: object,
) {
  try {
    const comment = await Comment.findById(commentId);
    if (comment.author.toString() !== userId.toString()) {
      throw new Error();
    }

    await Post.findByIdAndUpdate(postId, {
      $pull: {
        comments: { _id: commentId },
      },
    });
    await Comment.findByIdAndDelete(commentId);
  } catch (err) {
    throw new Error("잘못된 접근입니다.");
  }
}
