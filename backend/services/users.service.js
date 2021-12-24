/* eslint-disable import/extensions */
import mongoose from "mongoose";
import { User, Post, Bookmark, Comment } from "../models/index.js";

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

export const getUserById = async (googleId) => {
  const user = await User.findOne({ googleId });

  return user;
};

export const getPostByUserId = async (_id, page, perPage) => {
  const objId = mongoose.Types.ObjectId(_id);

  const total = await Post.find({ author: objId }).countDocuments();
  const totalPage = Math.ceil(total / perPage);

  const myPosts = await Post.find({ author: objId })
    .sort({ createdAt: -1 })
    .skip((page - 1) * perPage)
    .limit(perPage)
    .populate("author");

  const posts = myPosts.map((post) => ({
    // eslint-disable-next-line no-underscore-dangle
    id: post._id,
    wideAddr: post.location.wideAddr,
    localAddr: post.location.localAddr,
    photos: post.photos[0].url,
    title: post.title,
    likes: post.likes,
  }));

  return {
    data: posts,
    pagination: {
      page,
      nextPage: page < totalPage,
    },
  };
};

export const getCommentsByUserId = async (_id) => {
  const objId = mongoose.Types.ObjectId(_id);
  const comments = await Comment.find({ author: objId }).populate("author");

  return comments;
};

export const getUserBookmarks = async (_id, page, perPage) => {
  const userObjId = mongoose.Types.ObjectId(_id);

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
