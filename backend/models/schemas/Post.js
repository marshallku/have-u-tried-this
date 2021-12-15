import { Schema } from "mongoose";

const PostSchema = new Schema(
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
        url: String, //
        text: String, // 이미지 설명 title 저장
      },
    ],
    // author: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
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
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default PostSchema;
