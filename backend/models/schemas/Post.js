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
        url: String,
        text: String,
      },
    ],
    // author: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    // location: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Location",
    //   required: true,
    // },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);
