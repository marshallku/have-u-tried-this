/* eslint-disable import/extensions */
import mongoose from "mongoose";
import PostSchema from "./Post.js";

export default new mongoose.Schema({
  wideAddr: {
    type: String,
    required: true,
  },
  localAddr: {
    type: String,
    required: true,
  },
  posts: {
    type: [PostSchema],
    default: undefined,
  },
});
