/* eslint-disable import/extensions */
import { Router } from "express";
import { validation } from "../../services/locations";
import {
  getAllPost,
  getAllLocation,
  findById,
  createPost,
  updatePost,
  deletePost,
} from "../../services/posts";
import { pushLike, pushUnlike, checkLike } from "../../services/bookmark";
import {
  uploadFile,
  loginRequired,
  loginUserInfo,
} from "../../middlewares/index";
import { filterEmptyString, asyncHandler } from "../../utils/index";
import commentRouter from "./comments";

const router = Router();

export default (app: Router) => {
  app.use("/posts", router);

  // 지역 별 포스트 리스트 페이지
  router.get(
    "/",
    loginUserInfo,
    asyncHandler(async (req, res) => {
      const location = {
        wideAddr: String(req.query.wide),
        localAddr: String(req.query.local),
      };

      const page = Number(req.query.page) || 1;
      const perPage = Number(req.query.perPage) || 9;

      const isExistsLocation = await validation(location);
      if (!isExistsLocation) {
        throw new Error("허용되지 않은 접근입니다.");
      }

      const postsByAddr = await getAllLocation(
        req.user,
        location,
        page,
        perPage,
      );
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
    loginUserInfo,
    asyncHandler(async (req, res) => {
      const { postId } = req.params;
      const post = await findById(postId, req.user);
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

      const isExistsLocation = await validation({ wideAddr, localAddr });
      if (!isExistsLocation) {
        throw new Error("허용되지 않은 접근입니다.");
      }

      filterEmptyString(title, contents);

      const postId = await createPost(
        title,
        contents,
        photos,
        wideAddr,
        localAddr,
        authorId,
      );
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

      await updatePost(postId, title, contents, authorId);
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
    "/:postId/like",
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
};
