import request from "supertest";
import server from "../src/app";
import "regenerator-runtime";
import jwt, { SignOptions } from "jsonwebtoken";

describe("location 호출 테스트", () => {
  const payload = { googleId: process.env.TEST_GOOGLE_ID };
  const signOpts: SignOptions = {
    expiresIn: "7d",
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, signOpts);
  const imgPath = __dirname;

  beforeAll(async () => {
    const res = await request(server)
      .post("/api/posts")
      .set("authorization", "Bearer " + token)
      .field("title", "emptytitle")
      .field("contents", "contents")
      .field("wideAddr", "서울특별시")
      .field("localAddr", "마포구")
      .attach("photos", imgPath + "/img/test.png");
  });

  it("location list", async () => {
    const res = await request(server).get("/api/locations/all").send();

    expect(res.statusCode).toEqual(200);
    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining(["서울특별시", "인천광역시"]),
    );
  });

  it("index page", async () => {
    const res = await request(server).get("/api/locations").send();

    expect(res.statusCode).toEqual(200);
    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining(["data", "pagination"]),
    );
  });

  it("local page", async () => {
    const res = await request(server)
      .get("/api/posts")
      .query({ wide: "서울특별시", local: "마포구" })
      .send();

    expect(res.statusCode).toEqual(200);
    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining(["data", "pagination"]),
    );
  });
});
