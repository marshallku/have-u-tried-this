const { Router } = require("express");
const router = Router();

const asyncHandler = require("../utils/async-handler");
const uploadFile = require("../middlewares/multer");

const postService = require("../services/posts");
const postDto = require("../models/DTO/Post");

router.get("/", async (req, res) => {
  const wide_addr = req.query["wide-addr"];
  const local_addr = req.query["local-addr"];

  const postsByAddr = await postService.getAll({ wide_addr, local_addr });
  res.json(postsByAddr);
});

// 사진 디테일
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const post = await postService.findOne(id);
    if (!post) {
      console.log("errr");
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
    const post = new postDto(title, content, photos, wide_addr, local_addr);
    const postId = await postService.createPost(post);
    res.json({ id: postId.id });
  }),
);

// 사진 수정
// 사진 삭제

module.exports = router;
