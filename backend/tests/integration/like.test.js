/* eslint-disable */
import "regenerator-runtime";
import request from "supertest";
import path from "path";
import app from "../../app";

describe("북마크 기능 테스트", () => {
  let postIdLike;

  test("테스트 케이스 글 생성", async () => {
    const __dirname = path.resolve();
    const pwd = path.join(__dirname, "tests/integration/test-image");
    const res = await request(app)
      .post("/api/posts")
      .field("title", "like test case")
      .field("content", "content")
      .field("wideAddr", "서울특별시")
      .field("localAddr", "강남구")
      .attach("photos", pwd + "/1.JPG");

    expect(res.statusCode).toEqual(201);
    expect(Object.keys(res.body)).toEqual(expect.arrayContaining(["id"]));

    postIdLike = res.body.id;
  });

  test("성공 좋아요 클릭", async () => {
    const res = await request(app)
      .post("/api/posts/" + postIdLike + "/like")
      .send();

    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toEqual(true);
  });

  test("성공 좋아요 클릭 시 좋아요 갯수 확인", async () => {
    const res = await request(app)
      .get("/api/posts/" + postIdLike)
      .send();

    expect(res.body.likes).toEqual(1);
  });

  test("유저 북마크 기능 테스트", async () => {
    const res = await request(app)
      .get("/api/users/" + process.env.AUTHOR_ID + "/likes")
      .send();

    expect(res.statusCode).toEqual(200);
    expect(Object.keys(res.body[0])).toEqual(
      expect.arrayContaining([
        "location",
        "_id",
        "title",
        "content",
        "photos",
        "likes",
        "author",
        "createdAt",
        "updatedAt",
        "__v",
      ]),
    );
  });

  test("실패 좋아요 클릭, 없는 게시물", async () => {
    const res = await request(app).post("/api/posts/notexist/like").send();

    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toEqual("잘못된 접근입니다.");
  });

  test("유저 북마크 리스트 출력", async () => {
    const res = await request(app)
      .get("/api/users/" + process.env.AUTHOR_ID + "/likes")
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  test("성공 좋아요 취소 클릭", async () => {
    const res = await request(app)
      .delete("/api/posts/" + postIdLike + "/unlike")
      .send();

    expect(res.statusCode).toEqual(204);
  });

  test("성공 좋아요 취소 클릭 시 좋아요 갯수 확인", async () => {
    const res = await request(app)
      .get("/api/posts/" + postIdLike)
      .send();

    expect(res.body.likes).toEqual(0);
  });

  test("유저 북마크 리스트 없을 때 출력", async () => {
    const res = await request(app)
      .get("/api/users/" + process.env.AUTHOR_ID + "/likes")
      .send();

    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toEqual("저장된 글이 없습니다.");
  });

  test("실패 좋아요 취소 클릭, 없는 게시물", async () => {
    const res = await request(app).delete("/api/posts/notexist/unlike").send();

    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toEqual("잘못된 접근입니다.");
  });

  test("Success DELETE /api/posts/:id 포스트 삭제", async () => {
    const res = await request(app)
      .delete("/api/posts/" + postIdLike)
      .send();

    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ success: true });
  });
});
