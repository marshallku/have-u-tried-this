import instance from "./instance";
import createInstance from "../utils/fetcher";

export async function getAddressData() {
  return instance.get("/locations/all");
}

// eslint-disable-next-line consistent-return
export async function getAddressAPI(longitude, latitude) {
  const URL = "https://dapi.kakao.com/v2/local/geo/coord2regioncode.json";
  const resource = `?x=${longitude}&y=${latitude}`;
  const request = {
    method: "GET",
    headers: {
      Authorization: "KakaoAK 4be5731b9445ebbbc4acf16e9d6f0588",
    },
  };

  const kakaoInstance = createInstance({ baseUrl: URL });
  const data = await kakaoInstance.get(resource, request);

  const [legalDivision] = data.documents;
  const { region_1depth_name: wideAddr, region_2depth_name: localAddr } =
    legalDivision;

  return {
    wideAddr,
    localAddr,
  };
}
