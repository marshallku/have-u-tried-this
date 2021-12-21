/* eslint-disable */
import "regenerator-runtime";
import request from "supertest";
import app from "../../app";

describe("유저 기능 테스트", () => {
  test("구글 로그인 페이지 접속", async () => {
    const res = await request(app).get("/api/auth/google").send();

    expect(res.statusCode).toEqual(302);
    expect(res.header.location).toEqual(
      expect.stringContaining("https://accounts.google.com/o/oauth2/v2/auth"),
    );
  });
});
