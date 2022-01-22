/* eslint-disable import/extensions */
import mongoose, { Document } from "mongoose";
import { CommentSchema } from "./Comment";
import { IUserDocument } from "./User";
import { ILocation } from "./Location";
import { ICommentDocument } from "./Comment";

interface IPhotos {
  url: string;
  text: string;
  filename: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IPost {
  title: string;
  contents: string;
  photos: Array<IPhotos>;
  likes: number;
  address: Omit<ILocation, "posts">;
  author: IUserDocument;
  comments: Array<ICommentDocument>;
}

export interface IPostDocument extends IPost, Document {}

export const PostSchema = new mongoose.Schema<IPostDocument>(
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
      min: 0,
      default: 0,
    },
    address: {
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
    versionKey: false,
  },
);
