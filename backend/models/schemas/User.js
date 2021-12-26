import mongoose from "mongoose";
import moment from "moment";
import "moment-timezone";

// 타임존 설정
moment.tz.setDefault("Asia/Seoul");

const UserSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: [true, "email required"],
      unique: [true, "email already registered"],
    },
    firstName: String,
    lastName: String,
    profile: String,
    source: { type: String, required: [true, "source not specified"] },
    lastVisited: {
      type: Date,
      default: moment(),
    },
  },
  {
    versionKey: false,
  },
);

export default UserSchema;
