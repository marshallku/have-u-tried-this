const { Router } = require("express");
const router = Router();
const fs = require("fs");
const path = require("path");

const asyncHandler = require("../utils/async-handler");
const uploadFile = require("../middlewares/multer");

const postService = require("../services/posts");
const postDto = require("../models/DTO/Post");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const wide_addr = req.query["wide-addr"];
    const local_addr = req.query["local-addr"];

    const postsByAddr = await postService.getAll({ wide_addr, local_addr });
    res.json(postsByAddr);
  }),
);

// 사진 디테일
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const post = await postService.findById(id);
    if (!post) {
      throw new Error("No Data");
    }
    res.json(post);
  }),
);

// 사진 업로드
router.post(
  "/",
  uploadFile,
  asyncHandler(async (req, res) => {
    const photos = req.files;
    const { title, content, wide_addr, local_addr } = req.body;

    const check = await postService.findByTitle(title);
    if (check) {
      photos.forEach((photo) => {
        fs.unlink(path.join(__dirname, "../", photo.path), (err) => {});
      });
      throw new Error("Already Exists");
    }

    const post = new postDto(title, content, photos, wide_addr, local_addr);
    const postId = await postService.createPost(post);
    res.json({ id: postId.id });
  }),
);

// 사진 수정
// 사진 삭제

module.exports = router;
