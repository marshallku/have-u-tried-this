/* eslint-disable import/extensions */
import { Router } from "express";
import mongoose from "mongoose";
import asyncHandler from "../utils/async-handler.js";
import UserSchema from "../models/schemas/User.js";

const router = Router();

router.get(
  "/callback/google",
  asyncHandler(async (req, res) => {
    res.json({ status: "ok" });
  }),
);

router.get(
  "/test",
  asyncHandler(async (req, res) => {
    const User = mongoose.model("User", UserSchema);
    const newUser = new User({
      googleId: "googleId",
      email: "email",
      firstName: "firstName",
      lastName: "lastName",
      profileImage: "profileImage",
      lastLoginAt: new Date(),
      isActive: true,
    });
    newUser.save();
    res.json({ created: newUser });
  }),
);

export default router;
