import mongoose, { Document } from "mongoose";
import moment from "moment";
import "moment-timezone";

// 타임존 설정
moment.tz.setDefault("Asia/Seoul");

interface IUser {
  googleId: string;
  email: string;
  firstName: string;
  lastName: string;
  profile: string;
  source: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDocument extends IUser, Document {}

export const UserSchema = new mongoose.Schema<IUserDocument>(
  {
    googleId: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: String,
    lastName: String,
    profile: String,
    source: { type: String, required: [true, "source not specified"] },
  },
  {
    versionKey: false,
  },
);
