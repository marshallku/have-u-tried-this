import instance from "./instance";
import createInstance from "../utils/fetcher";

export async function getAddressData(): Promise<LocationsListResponse> {
  return instance.get("/locations/all");
}

export async function getAddressAPI(
  longitude: number,
  latitude: number,
): Promise<{
  wideAddr: string;
  localAddr: string;
}> {
  const kakaoInstance = createInstance({
    baseUrl: "https://dapi.kakao.com/v2/local/geo/coord2regioncode.json",
  });
  const data = await kakaoInstance.get(`?x=${longitude}&y=${latitude}`, {
    headers: {
      Authorization: "KakaoAK 4be5731b9445ebbbc4acf16e9d6f0588",
    },
  });

  const [legalDivision] = data.documents;
  const { region_1depth_name: wideAddr, region_2depth_name: localAddr } =
    legalDivision;

  return {
    wideAddr,
    localAddr,
  };
}
