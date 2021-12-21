/* eslint-disable import/extensions */
import { Router } from "express";
import { unlink } from "fs";
import path from "path";
import { validation } from "../services/locations.js";
import {
  getAll,
  findById,
  findByTitle,
  createPost,
  updatePost,
  deletePost,
} from "../services/posts.js";
import { pushLike, pushUnlike } from "../services/bookmark.js";
import uploadFile from "../middlewares/multer.js";
import loginRequired from "../middlewares/login-required.js";
import PostDto from "../models/DTO/Post.js";
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

    const page = req.query.page || 1;
    const perPage = req.query.perPage || 9;

    const isExists = await validation(location);
    if (!isExists) {
      throw new Error("허용되지 않은 접근입니다.");
    }

    const postsByAddr = await getAll(location, page, perPage);
    res.json(postsByAddr);
  }),
);

// 포스트 상세 페이지
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const post = await findById(id);
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
    const { title, content, wideAddr, localAddr } = req.body;

    const isExists = await findByTitle(title);
    // 타이틀 중복 시 업로드된 이미지 제거
    if (isExists) {
      photos.forEach((photo) => {
        // eslint-disable-next-line no-underscore-dangle
        const __dirname = path.resolve();
        unlink(path.join(__dirname, photo.path), () => {});
      });
      throw new Error("이미 존재하는 제목입니다.");
    }

    const post = new PostDto(
      title,
      content,
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
  "/:id",
  loginRequired,
  asyncHandler(async (req, res) => {
    // eslint-disable-next-line no-underscore-dangle
    const authorId = req.user._id;
    const postId = req.params.id;
    const { title, content, wideAddr, localAddr } = req.body;

    // title 검증 필요
    const isExists = await findByTitle(title);
    if (isExists) {
      throw new Error("이미 존재하는 제목입니다.");
    }

    const newPostDto = new PostDto(
      title,
      content,
      undefined,
      wideAddr,
      localAddr,
      authorId,
    );

    const newPost = await updatePost(postId, newPostDto);
    res.json(newPost);
  }),
);

// 좋아요
router.post(
  "/:id/like",
  loginRequired,
  asyncHandler(async (req, res) => {
    // eslint-disable-next-line no-underscore-dangle
    const authorId = req.user._id;
    const postId = req.params.id;
    await pushLike(authorId, postId);
    res.status(201).json({ success: true });
  }),
);

// 좋아요 취소
router.delete(
  "/:id/unlike",
  loginRequired,
  asyncHandler(async (req, res) => {
    // eslint-disable-next-line no-underscore-dangle
    const authorId = req.user._id;
    const postId = req.params.id;
    await pushUnlike(authorId, postId);
    res.status(204).json();
  }),
);

// 포스트 삭제 로직
router.delete(
  "/:id",
  loginRequired,
  asyncHandler(async (req, res) => {
    // eslint-disable-next-line no-underscore-dangle
    const authorId = req.user._id;
    const postId = req.params.id;
    await deletePost(postId, authorId);
    res.json({ success: true });
  }),
);

export default router;
