import request from "supertest";
import server from "../src/app";
import "regenerator-runtime";
import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";
import db from "mongoose";

dotenv.config();

describe("Post 테스트", () => {
  const payload = { googleId: process.env.TEST_GOOGLE_ID };
  const signOpts: SignOptions = {
    expiresIn: "7d",
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, signOpts);
  const imgPath = __dirname;
  let postId: string;
  const title = Math.random().toString().substring(2);

  it("Post 생성 테스트", async () => {
    const res = await request(server)
      .post("/api/posts")
      .set("authorization", "Bearer " + token)
      .field("title", title)
      .field("contents", "contents")
      .field("wideAddr", "서울특별시")
      .field("localAddr", "마포구")
      .attach("photos", imgPath + "/img/test.png");

    expect(res.statusCode).toEqual(201);
    expect(Object.keys(res.body)).toEqual(expect.arrayContaining(["id"]));
    postId = res.body.id;
  });

  it("Post READ 테스트", async () => {
    const res = await request(server)
      .get("/api/posts/" + postId)
      .send();

    expect(res.statusCode).toEqual(200);
    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining(["post", "isLiked"]),
    );
    expect(res.body.isLiked).toEqual(false);
    expect(res.body.post.title).toEqual(title);
    expect(res.body.post.contents).toEqual("contents");
  });

  it("Post Update 테스트", async () => {
    const res = await request(server)
      .put("/api/posts/" + postId)
      .set("authorization", "Bearer " + token)
      .send({ title: "newTitle", contents: "newContents" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);

    const res2 = await request(server)
      .get("/api/posts/" + postId)
      .send();
    expect(res2.statusCode).toEqual(200);
    expect(res2.body.post.title).toEqual("newTitle");
    expect(res2.body.post.contents).toEqual("newContents");
  });

  it("Post Update 테스트", async () => {
    const res = await request(server)
      .put("/api/posts/" + "notexistPostDelete")
      .set("authorization", "Bearer " + token)
      .send({ title: "newTitle", contents: "newContents" });

    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toEqual("존재하지 않는 글입니다.");
  });

  it("Post delete 테스트", async () => {
    const res = await request(server)
      .delete("/api/posts/" + postId)
      .set("authorization", "Bearer " + token)
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toEqual(true);
  });

  it("Fail Post delete 테스트", async () => {
    const res = await request(server)
      .delete("/api/posts/" + "notexistPostDelete")
      .set("authorization", "Bearer " + token)
      .send();

    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toEqual("존재하지 않는 글입니다.");
  });

  afterAll(async () => {
    // DB 초기화
    const conn = await db.connect(process.env.MONGO_DB_URI);
    // 생성된 Post 삭제
    conn.connection.collection("posts").deleteMany({});
    // location  비우기
    conn.connection
      .collection("locations")
      .updateMany({ posts: { $exists: true } }, { $set: { posts: [] } });
  });
});
