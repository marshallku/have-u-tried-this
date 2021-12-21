/* eslint-disable import/extensions */
import { Router } from "express";
import asyncHandler from "../utils/async-handler.js";
import {
  getPostByUserId,
  getUserBookmarks,
} from "../services/users.service.js";

const router = Router();

// 내 게시글 목록
router.get(
  "/:userId/myposts",
  asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const myPosts = await getPostByUserId(userId);

    res.json(myPosts);
  }),
);

router.get(
  "/:userId/likes",
  asyncHandler(async (req, res) => {
    const { userId } = req.params;
    // const { _id } = req.user;
    const bookmarks = await getUserBookmarks(userId);
    res.status(200).json(bookmarks);
  }),
);

export default router;
