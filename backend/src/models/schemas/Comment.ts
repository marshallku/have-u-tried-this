import mongoose, { Document } from "mongoose";
import { IUserDocument } from "./User";
import { IPostDocument } from "./Post";

interface IComment {
  author: IUserDocument;
  post: IPostDocument;
  contents: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICommentDocument extends IComment, Document {}

export const CommentSchema = new mongoose.Schema<ICommentDocument>(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    contents: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
