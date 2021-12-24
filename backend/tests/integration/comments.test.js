/* eslint-disable */
import "regenerator-runtime";
import request from "supertest";
import app from "../../app";
import path from "path";

describe("댓글 기능 테스트", () => {
  let postId;
  let commentId;
  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDA4NjY2MjEsImRhdGEiOiIxMDQwMjA3MzEyOTg1NTQ3MDQ1NzMiLCJpYXQiOjE2NDAyNjE4MjF9.uaEIqJw5De5MXifwqOtSB3Yv1CRV65LIQyI876GwvCI";

  test("테스트 글 생성", async () => {
    const __dirname = path.resolve();
    const pwd = path.join(__dirname, "tests/integration/test-image");
    const res = await request(app)
      .post("/api/posts")
      .set("authorization", token)
      .field("title", "comment test")
      .field("contents", "content")
      .field("wideAddr", "서울특별시")
      .field("localAddr", "강남구")
      .attach("photos", pwd + "/1.JPG");

    expect(res.statusCode).toEqual(201);
    expect(Object.keys(res.body)).toEqual(expect.arrayContaining(["id"]));

    postId = res.body.id;
  });

  test("댓글 생성 테스트", async () => {
    const res = await request(app)
      .post("/api/posts/" + postId + "/comments")
      .set("authorization", token)
      .send({ contents: "testcontent" });

    expect(res.statusCode).toEqual(201);
    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining([
        "author",
        "post",
        "contents",
        "_id",
        "createdAt",
        "updatedAt",
      ]),
    );

    commentId = res.body._id;
  });

  test("댓글 생성 테스트 실패 케이스(없는 게시물)", async () => {
    const res = await request(app)
      .post("/api/posts/" + "notexist" + "/comments")
      .set("authorization", token)
      .send({ contents: "testcontent" });

    expect(res.statusCode).toEqual(500);
  });

  test("댓글 생성 리스트 호출 생성 확인 및 호출 확인", async () => {
    const res = await request(app)
      .get("/api/posts/" + postId + "/comments")
      .send();

    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining(["comments", "pagination"]),
    );
    expect(res.body.comments.length).toEqual(1);
  });

  test("댓글 삭제 테스트 실패 케이스 (있는 게시물 없는 코멘트)", async () => {
    const res = await request(app)
      .delete("/api/posts/" + postId + "/comments/" + "notexist")
      .set("authorization", token)
      .send();

    expect(res.statusCode).toEqual(500);
  });

  test("댓글 삭제 테스트", async () => {
    const res = await request(app)
      .delete("/api/posts/" + postId + "/comments/" + commentId)
      .set("authorization", token)
      .send();

    expect(res.statusCode).toEqual(204);
  });

  test("댓글 생성 리스트 호출 삭제 확인", async () => {
    const res = await request(app)
      .get("/api/posts/" + postId + "/comments")
      .send();

    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining(["comments", "pagination"]),
    );
    expect(res.body.comments.length).toEqual(0);
  });

  test("테스트 포스트 삭제", async () => {
    await request(app)
      .delete("/api/posts/" + postId)
      .set("authorization", token)
      .send();
  });
});
