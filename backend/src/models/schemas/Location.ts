/* eslint-disable import/extensions */
import mongoose from "mongoose";
import { IPostDocument, PostSchema } from "./Post";

export interface ILocation {
  wideAddr: string;
  localAddr: string;
  posts: Array<IPostDocument>;
  createdAt: Date;
  updatedAt: Date;
}

export const LocationSchema = new mongoose.Schema<ILocation>(
  {
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
  },
  {
    versionKey: false,
  },
);
