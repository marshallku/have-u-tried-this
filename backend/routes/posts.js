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
} from "../services/posts.js";
import uploadFile from "../middlewares/multer.js";
import PostDto from "../models/DTO/Post.js";
import asyncHandler from "../utils/async-handler.js";

const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const location = {
      wideAddr: req.query["wide-addr"],
      localAddr: req.query["local-addr"],
    };

    const isExists = await validation(location);
    if (!isExists) {
      throw new Error("Not access");
    }

    const postsByAddr = await getAll(location);
    res.json(postsByAddr);
  }),
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const post = await findById(id);
    if (!post) {
      throw new Error("No Data");
    }
    res.json(post);
  }),
);

router.post(
  "/",
  uploadFile,
  asyncHandler(async (req, res) => {
    const photos = req.files;
    const { title, content, wideAddr, localAddr } = req.body;

    const check = await findByTitle(title);
    if (check) {
      photos.forEach((photo) => {
        // eslint-disable-next-line no-underscore-dangle
        const __dirname = path.resolve();
        unlink(path.join(__dirname, photo.path), () => {});
      });
      throw new Error("Already Exists");
    }

    const post = new PostDto(title, content, photos, wideAddr, localAddr);
    const postId = await createPost(post);
    res.json({ id: postId });
  }),
);

export default router;
