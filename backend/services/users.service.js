/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/extensions */
import mongoose from "mongoose";
import { User, Post } from "../models/index.js";

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
