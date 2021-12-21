/* eslint-disable */
import "regenerator-runtime";
import request from "supertest";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import app from "../../app";
import { Post } from "../../models/index.js";

dotenv.config();
jest.setTimeout(10000);

describe("post 라우터 테스트", () => {
  let postId;
  let updatePostId;

  afterAll(async () => {
    // 글 생성 이후 정리
    await Post.findOneAndDelete({ title: "title" });
    // 중복 글 이후 정리
    await Post.findOneAndDelete({ title: "already" });

    // 업로드된 파일 모두 지우기
    const __dirname = path.resolve();
    const uploadPath = path.join(__dirname, "public/uploads");
    if (fs.existsSync(uploadPath)) {
      fs.readdirSync(uploadPath).forEach((file, index) => {
        var curPath = uploadPath + "/" + file;
        fs.unlinkSync(curPath);
      });
    }
  });

  test("Success /api/posts", async () => {
    const res = await request(app)
      .get("/api/posts")
      .query({
        wide: "서울특별시",
        local: "마포구",
      })
      .send();

    expect(res.statusCode).toEqual(200);
    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining(["data", "pagination"]),
    );
    expect(Object.keys(res.body.pagination)).toEqual(
      expect.arrayContaining(["page", "perPage", "totalPage"]),
    );
  });

  test("Failure /api/posts 없는 지역 검색", async () => {
    const res = await request(app)
      .get("/api/posts")
      .query({
        wide: "서울특별시",
        local: "이상한구",
      })
      .send();

    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toEqual("허용되지 않은 접근입니다.");
  });

  test("Failure /api/posts 있는 지역인데, 포스트가 없음", async () => {
    const res = await request(app)
      .get("/api/posts")
      .query({
        wide: "세종특별자치시",
        local: "세종특별자치시",
      })
      .send();

    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toEqual("해당 지역의 글이 존재하지 않습니다.");
  });

  test("Failure GET /api/posts/id, 없는 글 조회", async () => {
    const res = await request(app).get("/api/posts/donotexistpostid").send();

    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toEqual("존재하지 않는 글입니다.");
  });

  test("Success Post /api/posts 글 생성", async () => {
    const __dirname = path.resolve();
    const pwd = path.join(__dirname, "tests/integration/test-image");
    const res = await request(app)
      .post("/api/posts")
      .field("title", "title")
      .field("content", "content")
      .field("wideAddr", "서울특별시")
      .field("localAddr", "강남구")
      .attach("photos", pwd + "/1.JPG");

    expect(res.statusCode).toEqual(201);
    expect(Object.keys(res.body)).toEqual(expect.arrayContaining(["id"]));

    postId = res.body.id;
  });

  test("Success GET /api/posts/id 글 상세 페이지", async () => {
    const res = await request(app)
      .get("/api/posts/" + postId)
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toEqual("title");
    expect(res.body.content).toEqual("content");
    expect(res.body.location.localAddr).toEqual("강남구");
    expect(res.body.likes).toBeGreaterThanOrEqual(0);
    expect(typeof res.body.author).toEqual("string");
    expect(typeof res.body.createdAt).toEqual("string");
  });

  test("Failure Post /api/posts, 이미 존재하는 글 생성", async () => {
    const __dirname = path.resolve();
    const pwd = path.join(__dirname, "tests/integration/test-image");
    const dummy = await request(app)
      .post("/api/posts")
      .field("title", "already")
      .field("content", "content")
      .field("wideAddr", "서울특별시")
      .field("localAddr", "강남구")
      .attach("photos", pwd + "/1.JPG");

    updatePostId = dummy.body.id;

    const res = await request(app)
      .post("/api/posts")
      .field("title", "already")
      .field("content", "content")
      .field("wideAddr", "서울특별시")
      .field("localAddr", "강남구")
      .attach("photos", pwd + "/1.JPG");

    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toEqual("이미 존재하는 제목입니다.");
  });

  test("Failure Post /api/posts, 4개 이상 그림 업로드", async () => {
    const __dirname = path.resolve();
    const pwd = path.join(__dirname, "tests/integration/test-image");
    const res = await request(app)
      .post("/api/posts")
      .field("title", "title-aa")
      .field("content", "content")
      .field("wideAddr", "서울특별시")
      .field("localAddr", "강남구")
      .attach("photos", pwd + "/1.JPG")
      .attach("photos", pwd + "/2.jpeg")
      .attach("photos", pwd + "/3.jpeg")
      .attach("photos", pwd + "/4.jpeg")
      .attach("photos", pwd + "/5.jpg");

    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toEqual("Unexpected field");
  });

  test("Failure Post /api/posts, 너무 큰 용량 파일", async () => {
    const __dirname = path.resolve();
    const pwd = path.join(__dirname, "tests/integration/test-image");
    const res = await request(app)
      .post("/api/posts")
      .field("title", "title-aa")
      .field("content", "content")
      .field("wideAddr", "서울특별시")
      .field("localAddr", "강남구")
      .attach("photos", pwd + "/1.JPG")
      .attach("photos", pwd + "/tooLarge.jpg");

    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toEqual("File too large");
  });

  test("Failure Post /api/posts, 파일 형식 빌런", async () => {
    const __dirname = path.resolve();
    const pwd = path.join(__dirname, "tests/integration/test-image");
    const res = await request(app)
      .post("/api/posts")
      .field("title", "title-aa")
      .field("content", "content")
      .field("wideAddr", "서울특별시")
      .field("localAddr", "강남구")
      .attach("photos", pwd + "/1.JPG")
      .attach("photos", pwd + "/locations.csv");

    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toEqual("이미지 파일만 업로드 가능합니다.");
  });

  test("Success DELETE /api/posts/:id 포스트 삭제", async () => {
    const res = await request(app)
      .delete("/api/posts/" + postId)
      .send();

    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ success: true });
  });

  test("Failure DELETE /api/posts/:id 포스트 삭제", async () => {
    const res = await request(app).delete("/api/posts/123").send();

    expect(res.status).toEqual(500);
    expect(res.body).toEqual({
      error: true,
      message: "존재하지 않는 글입니다.",
    });
  });

  test("수정 기능 실패 테스트, 없는 게시물", async () => {
    const res = await request(app).put("/api/posts/1233").send({
      title: "update title",
      content: "content update",
      wideAddr: "서울특별시",
      localAddr: "성북구",
    });

    expect(res.body.message).toEqual("존재하지 않는 글입니다.");
  });

  test("수정 기능 실패 테스트 이미 있는 이름", async () => {
    const res = await request(app)
      .put("/api/posts/" + updatePostId)
      .send({
        title: "already",
        content: "content update",
        wideAddr: "서울특별시",
        localAddr: "성북구",
      });

    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toEqual("이미 존재하는 제목입니다.");
  });

  test("수정 기능 성공 테스트 후 삭제", async () => {
    const res = await request(app)
      .put("/api/posts/" + updatePostId)
      .send({
        title: "update title",
        content: "content update",
        wideAddr: "서울특별시",
        localAddr: "성북구",
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body._id).toEqual(updatePostId);
    expect(res.body.title).toEqual("update title");
    expect(res.body.content).toEqual("content update");
    expect(res.body.location.wideAddr).toEqual("서울특별시");
    expect(res.body.location.localAddr).toEqual("성북구");
    const createdAt = new Date(res.body.createdAt);
    const updatedAt = new Date(res.body.updatedAt);
    expect(createdAt <= updatedAt).toEqual(true);
    expect(res.body.author.toString()).toEqual(process.env.AUTHOR_ID);

    await request(app)
      .delete("/api/posts/" + updatePostId)
      .send();
  });
});
