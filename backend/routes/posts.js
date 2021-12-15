const { Router } = require("express");
const router = Router();

const asyncHandler = require("../utils/async-handler");

const multer = require("multer");

const { fileFilter } = require("../config/multer");

const upload = multer({
  dest: "public/uploads/",
  limits: { fileSize: 1024 * 1024 * 2 },
  fileFilter: fileFilter,
});

const postService = require("../services/posts");
const postDto = require("../models/DTO/Post");

router.get("/", async (req, res) => {
  const wide_addr = req.query["wide-addr"];
  const local_addr = req.query["local-addr"];

  const postsByAddr = await postService.getAll({ wide_addr, local_addr });
  res.json(postsByAddr);
});

// 사진 디테일
router.get("/:id", async (req, res) => {});

// 사진 업로드
router.post(
  "/",
  upload.array("pictures", 4),
  asyncHandler(async (req, res) => {
    const pictures = req.files;
    const { title, content, wide_addr, local_addr } = req.body;
    const post = new postDto(title, content, pictures, wide_addr, local_addr);
    const postId = await postService.createPost(post);
    res.json(postId);
  }),
);

// 사진 수정
// 사진 삭제

module.exports = router;
