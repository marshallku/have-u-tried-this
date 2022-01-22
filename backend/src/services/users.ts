/* eslint-disable import/extensions */
import mongoose from "mongoose";
import { User, Post, Bookmark, Comment } from "../models/index";

export const addGoogleUser = ({
  googleId,
  email,
  firstName,
  lastName,
  profile,
  source,
}) => {
  const user = new User({
    googleId,
    email,
    firstName,
    lastName,
    profile,
    source,
  });
  return user.save();
};

export const getUserById = async (googleId: string) => {
  const user = await User.findOne({ googleId });

  return user;
};

export const getPostByUserId = async (
  _id: string,
  page: number,
  perPage: number,
) => {
  const objId = new mongoose.Types.ObjectId(_id);

  const total = await Post.find({ author: objId }).countDocuments();
  const totalPage = Math.ceil(total / perPage);

  const myPosts = await Post.find({ author: objId })
    .sort({ createdAt: -1 })
    .skip((page - 1) * perPage)
    .limit(perPage)
    .populate("author");

  const bookmarks = await Bookmark.find({ user: objId });

  const posts = myPosts.map((post) => ({
    // eslint-disable-next-line no-underscore-dangle
    id: post._id,
    wideAddr: post.address.wideAddr,
    localAddr: post.address.localAddr,
    photo: post.photos[0].url,
    title: post.title,
    likes: post.likes,
    isLiked: bookmarks.some(
      // eslint-disable-next-line no-underscore-dangle
      (bookmark) => bookmark.post.toString() === post.id,
    ),
  }));

  return {
    data: posts,
    pagination: {
      page,
      nextPage: page < totalPage,
    },
  };
};

export const getCommentsByUserId = async (
  _id: string,
  page: number,
  perPage: number,
) => {
  const objId = new mongoose.Types.ObjectId(_id);

  const total = await Comment.find({ author: objId }).countDocuments();
  const totalPage = Math.ceil(total / perPage);

  const comments = await Comment.find({ author: objId })
    .populate("author")
    .populate("post")
    .sort({ createdAt: -1 })
    .skip((page - 1) * perPage)
    .limit(perPage);

  return {
    data: comments.map((comment) => ({
      // eslint-disable-next-line no-underscore-dangle
      commentId: comment._id,
      // eslint-disable-next-line no-underscore-dangle
      postId: comment.post._id,
      photo: comment.post.photos[0].url,
      title: comment.post.title,
      comment: comment.contents,
    })),
    pagination: {
      page,
      nextPage: page < totalPage,
    },
  };
};

export const getUserBookmarks = async (
  _id: string,
  page: number,
  perPage: number,
) => {
  const userObjId = new mongoose.Types.ObjectId(_id);

  const total = await Bookmark.find({ user: userObjId }).countDocuments();
  const totalPage = Math.ceil(total / perPage);

  const bookmarks = await Bookmark.find({ user: userObjId })
    .sort({ createdAt: -1 })
    .skip((page - 1) * perPage)
    .limit(perPage)
    .populate("post");

  if (bookmarks.length === 0) {
    throw new Error("저장된 글이 없습니다.");
  }

  User.populate(bookmarks, { path: "author" });
  return {
    data: bookmarks.map((bookmark) => ({
      // eslint-disable-next-line no-underscore-dangle
      id: bookmark.post._id,
      wideAddr: bookmark.post.location.wideAddr,
      localAddr: bookmark.post.location.localAddr,
      photo: bookmark.post.photos[0].url,
      title: bookmark.post.title,
      likes: bookmark.post.likes,
    })),
    pagination: {
      page,
      nextPage: page < totalPage,
    },
  };
};
