import mongoose from "mongoose";

export default new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    contents: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
