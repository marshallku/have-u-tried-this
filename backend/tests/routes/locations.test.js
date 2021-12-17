/* eslint-disable */
import "regenerator-runtime";
import request from "supertest";
import app from "../../app";

jest.setTimeout(10000);

describe("location 라우터 테스트", () => {
  test("/api/locations", async () => {
    const res = await request(app)
      .get("/api/locations")
      .set("Content-Type", "application/json")
      .send();

    expect(res.statusCode).toEqual(200);
    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining(["data", "pagination"]),
    );
    expect(Object.keys(res.body["data"][0])).toEqual(
      expect.arrayContaining(["wideAddr", "localAddr", "photo"]),
    );
  });
});
