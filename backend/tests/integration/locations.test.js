/* eslint-disable */
import "regenerator-runtime";
import request from "supertest";
import app from "../../app";

jest.setTimeout(10000);

describe("location 라우터 통합 테스트", () => {
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
    expect(Object.keys(res.body["pagination"])).toEqual(
      expect.arrayContaining(["page", "perPage", "totalPage"]),
    );
  });

  test("/api/locations/all", async () => {
    const res = await request(app)
      .get("/api/locations/all")
      .set("Content-Type", "application/json")
      .send();

    const cities = [
      "서울특별시",
      "부산광역시",
      "대구광역시",
      "인천광역시",
      "광주광역시",
      "대전광역시",
      "울산광역시",
      "경기도",
      "세종특별자치시",
      "강원도",
      "충청북도",
      "충청남도",
      "전라북도",
      "전라남도",
      "경상북도",
      "경상남도",
      "제주특별자치도",
    ];
    expect(res.statusCode).toEqual(200);
    expect(Object.keys(res.body)).toEqual(expect.arrayContaining(cities));
  });
});
