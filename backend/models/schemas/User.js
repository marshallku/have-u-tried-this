import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    firstName: {
      type: String,
      default: null,
    },
    lastName: {
      type: String,
      default: null,
    },
    profileImage: {
      type: String,
    },
    lastLoginAt: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      dafault: true,
    },
  },
  {
    createdAt: {
      type: Date,
      immutable: true,
    },
    timestamps: true,
  },
);

export default UserSchema;
