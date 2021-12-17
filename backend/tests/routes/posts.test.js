/* eslint-disable */
import "regenerator-runtime";
import request from "supertest";
import app from "../../app";

describe("post 라우터 테스트", () => {
  test("Success /api/posts", async () => {
    const res = await request(app)
      .get("/api/posts")
      .query({
        wide: "서울특별시",
        local: "마포구",
      })
      .send();

    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining(["data", "pagination"]),
    );
  });
});
