import instance from "./instance";

export async function fetchAddressData() {
  return instance.get("/locations/all");
}

export async function fetchAddressAPI(longitude, latitude) {
  const kakaoApiUri = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`;
  const request = {
    method: "GET",
    headers: {
      Authorization: `KakaoAK 4be5731b9445ebbbc4acf16e9d6f0588`,
    },
  };

  // TODO: fetch가 정상적으로 수행되지 않았을 때 예외 처리하는 함수 만들기
  const response = await fetch(kakaoApiUri, request);
  const [legalDivision] = await response.json();
  // eslint-disable-next-line camelcase
  const { region_1depth_name, region_2depth_name } = legalDivision;

  // eslint-disable-next-line camelcase
  return { wideAddr: region_1depth_name, localAddr: region_2depth_name };
}
