const { Schema } = require("mongoose");

module.exports = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    pictures: [
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
      wide_addr: {
        type: String,
        required: true,
      },
      local_addr: {
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
