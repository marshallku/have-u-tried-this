/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/extensions */
import mongoose from "mongoose";
import { User, Post, Bookmark } from "../models/index.js";

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

export const getPostByUserId = async (_id) => {
  const objId = mongoose.Types.ObjectId(_id);
  const myPosts = await Post.find({ author: objId });
  return myPosts;
};

export const getUserBookmarks = async (_id) => {
  const userObjId = mongoose.Types.ObjectId(_id);
  const bookmarks = await Bookmark.find({ user: userObjId }).populate("post");
  if (bookmarks.length === 0) {
    throw new Error("저장된 글이 없습니다.");
  }
  return bookmarks.map((bookmark) => bookmark.post);
};
