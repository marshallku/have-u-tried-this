/* eslint-disable import/extensions */
import { Router } from "express";
import asyncHandler from "../utils/async-handler.js";
import { getPostByUserId } from "../services/users.service.js";

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

export default router;
