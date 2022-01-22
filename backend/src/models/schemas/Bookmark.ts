import mongoose from "mongoose";
import { IPostDocument } from "./Post";
import { IUserDocument } from "./User";

interface IBookmark {
  post: IPostDocument;
  user: IUserDocument;
  createdAt: Date;
  updatedAt: Date;
}

export const BookmarkSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
