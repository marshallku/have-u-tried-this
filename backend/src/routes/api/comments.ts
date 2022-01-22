import { Router } from "express";
import {
  createComment,
  deleteComment,
  getComments,
} from "../../services/comments";
import { loginRequired } from "../../middlewares/index";
import { asyncHandler, filterEmptyString } from "../../utils/index";

const router = Router({ mergeParams: true });

// 댓글 가져오기
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 10;

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

    filterEmptyString(contents);

    const comment = await createComment(postId, _id, contents);
    res.status(201).json(comment);
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
