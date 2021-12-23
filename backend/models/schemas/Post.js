/* eslint-disable import/extensions */
import mongoose from "mongoose";
import CommentSchema from "./Comment.js";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    contents: {
      type: String,
      required: true,
    },
    photos: [
      {
        url: String,
        text: String,
        filename: String,
      },
    ],
    likes: {
      type: Number,
      default: 0,
    },
    location: {
      wideAddr: {
        type: String,
        required: true,
      },
      localAddr: {
        type: String,
        required: true,
      },
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [CommentSchema],
  },
  {
    timestamps: true,
  },
);

export default PostSchema;
