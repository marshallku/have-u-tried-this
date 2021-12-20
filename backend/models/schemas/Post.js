import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    photos: [
      {
        url: String,
        text: String,
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
  },
  {
    timestamps: true,
  },
);

export default PostSchema;
