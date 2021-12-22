/* eslint-disable import/extensions */
import { Router } from "express";

import loginRequired from "../middlewares/login-required.js";
import asyncHandler from "../utils/async-handler.js";

import {
  createComment,
  deleteComment,
  getComments,
} from "../services/comments.js";

const router = Router({ mergeParams: true });

// 댓글 가져오기
router.get(
  "/",
  loginRequired,
  asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const page = req.query.page || 1;
    const perPage = req.query.perPage || 10;

    const comments = await getComments(postId, page, perPage);
    res.json(comments);
  }),
);

// 댓글 생성하기
router.post(
  "/",
  loginRequired,
  asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { contents } = req.body;
    const { _id } = req.user;

    const commentId = await createComment(postId, _id, contents);
    res.status(201).json({ id: commentId });
  }),
);

router.delete(
  "/:commentId",
  loginRequired,
  asyncHandler(async (req, res) => {
    const { postId, commentId } = req.params;
    const { _id } = req.user;
    await deleteComment(postId, commentId, _id);
    res.status(204).json();
  }),
);

export default router;
