/* eslint-disable import/extensions */
import { Router } from "express";
import sanitizeHtml from "sanitize-html";

import { validation } from "../services/locations.js";
import {
  getAllPost,
  getAll,
  findById,
  createPost,
  updatePost,
  deletePost,
} from "../services/posts.js";
import { pushLike, pushUnlike, checkLike } from "../services/bookmark.js";

import commentRouter from "./comments.js";

import uploadFile from "../middlewares/multer.js";
import loginRequired from "../middlewares/login-required.js";
import PostDto from "../models/DTO/Post.js";
import filterEmptyString from "../utils/empty-string-fliter.js";
import asyncHandler from "../utils/async-handler.js";

const router = Router();

// 지역 별 포스트 리스트 페이지
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const location = {
      wideAddr: req.query.wide,
      localAddr: req.query.local,
    };

    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 9;

    const isExists = await validation(location);
    if (!isExists) {
      throw new Error("허용되지 않은 접근입니다.");
    }

    const postsByAddr = await getAll(location, page, perPage);
    res.json(postsByAddr);
  }),
);

router.get(
  "/all",
  asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 9;

    const posts = await getAllPost(page, perPage);
    res.status(200).json(posts);
  }),
);

// 포스트 상세 페이지
router.get(
  "/:postId",
  asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const post = await findById(postId);
    res.json(post);
  }),
);

// 포스트 등록
router.post(
  "/",
  loginRequired,
  uploadFile,
  asyncHandler(async (req, res) => {
    // eslint-disable-next-line no-underscore-dangle
    const authorId = req.user._id;
    const photos = req.files;
    const { title, contents, wideAddr, localAddr } = req.body;

    filterEmptyString(title, contents);

    const post = new PostDto(
      sanitizeHtml(title),
      sanitizeHtml(contents),
      photos,
      wideAddr,
      localAddr,
      authorId,
    );
    const postId = await createPost(post);
    res.status(201).json({ id: postId });
  }),
);

// 포스트 수정 로직
router.put(
  "/:postId",
  loginRequired,
  asyncHandler(async (req, res) => {
    // eslint-disable-next-line no-underscore-dangle
    const authorId = req.user._id;
    const { postId } = req.params;
    const { title, contents } = req.body;

    filterEmptyString(title, contents);

    const newPostDto = new PostDto(
      sanitizeHtml(title),
      sanitizeHtml(contents),
      undefined,
      undefined,
      undefined,
      authorId,
    );

    await updatePost(postId, newPostDto);
    res.status(200).json({ success: true });
  }),
);

// 좋아요
router.get(
  "/:postId/like",
  loginRequired,
  asyncHandler(async (req, res) => {
    // eslint-disable-next-line no-underscore-dangle
    const authorId = req.user._id;
    const { postId } = req.params;
    const isLiked = await checkLike(authorId, postId);
    res.status(200).json({ isLiked });
  }),
);

router.post(
  "/:postId/like",
  loginRequired,
  asyncHandler(async (req, res) => {
    // eslint-disable-next-line no-underscore-dangle
    const authorId = req.user._id;
    const { postId } = req.params;
    await pushLike(authorId, postId);
    res.status(201).json({ success: true });
  }),
);

// 좋아요 취소
router.delete(
  "/:postId/unlike",
  loginRequired,
  asyncHandler(async (req, res) => {
    // eslint-disable-next-line no-underscore-dangle
    const authorId = req.user._id;
    const { postId } = req.params;
    await pushUnlike(authorId, postId);
    res.status(204).json();
  }),
);

// 코멘트

router.use("/:postId/comments", commentRouter);

// 포스트 삭제 로직
router.delete(
  "/:postId",
  loginRequired,
  asyncHandler(async (req, res) => {
    // eslint-disable-next-line no-underscore-dangle
    const authorId = req.user._id;
    const { postId } = req.params;
    await deletePost(postId, authorId);
    res.json({ success: true });
  }),
);

export default router;
