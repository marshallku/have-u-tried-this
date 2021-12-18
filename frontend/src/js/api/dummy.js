export const dummyAddress = {
  서울특별시: ["종로구", "중구"],
  광주광역시: ["동구", "서구", "남구", "북구", "광산구"],
  대전광역시: ["동구", "중구", "서구", "유성구", "대덕구"],
  울산광역시: ["중구", "남구", "동구", "북구", "울주군"],
  세종특별자치시: ["세종특별자치시"],
  경기도: ["수원시"],
  강원도: ["춘천시"],
  충청북도: ["청주시", "충주시"],
  충청남도: ["천안시", "공주시"],
  제주특별자치도: ["제주시", "서귀포시"],
};

const tmpUser = {
  nickname: "John Doe",
  profile:
    "https://lh3.googleusercontent.com/a/AATXAJxUzSTmgJx8JAf1CvXu_udg9ZXeT7xondn0svFd=s32-p-no",
  createdAt: new Date("2021-12-10T16:00:00Z"),
  updatedAt: new Date("2021-12-13T16:00:00Z"),
  lastLoginAt: new Date("2021-12-13T16:00:00Z"),
  isActive: true,
};

export async function fetchLocationListData() {
  return [
    {
      wideAddr: "서울특별시",
      localAddr: "종로구",
      photo:
        "https://lh3.googleusercontent.com/pw/AM-JKLV7TvNQ5eFsAjkF1OCVR8oTHGeW4iftbFHaf6NL1MKyC3G9IeZU1c38ENLCsXi2kxnwaVML_EutFf4dTEVCgoaJ1to_Y-Gfq1dD3_yc-G7uWpg-TV0oaI21DgSUjMt1jgETPHukIo7AjEMO0Tz6fYQK=s1080-no",
      likes: 30,
    },
    {
      wideAddr: "강원도",
      localAddr: "속초시",
      photo:
        "https://lh3.googleusercontent.com/pw/AM-JKLUU3lh8tC1cq7puzYNmkwcPgS7BDNvPzsn16pkzlNtqkNrb-dYuUiv0LPqpUb1pV84bzciY0REMHboqsYZIBOZiU8Pt7o9WcrmdeRQOEq4pWep-fDH23mCTr6Dc5qBrZJGM-aYIyAPI34qW6vmsEqVK=s1080-no",
      likes: 20,
    },
  ];
}

export async function fetchPostData() {
  return {
    title: "My First Post",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi aliquam consequat tempus. Pellentesque id diam a eros tristique viverra. Curabitur dolor nulla, vestibulum ac leo a, auctor lobortis ipsum. Pellentesque tempor ex ac aliquam bibendum. Suspendisse non nisi ut ante rutrum aliquam. Aenean suscipit erat tortor, eu sagittis ligula rhoncus id. In mattis, arcu vitae varius mollis, augue turpis volutpat libero, a imperdiet metus ligula quis orci. Maecenas eget libero eu nunc iaculis facilisis. Duis vulputate interdum semper. Nulla luctus neque eget leo porttitor, a hendrerit velit pretium. Aliquam dignissim, felis vitae ultricies efficitur, massa lectus condimentum dolor, tristique laoreet orci velit eu metus.",
    pictures: [
      "https://lh3.googleusercontent.com/pw/AM-JKLVfOfjssCkIIOJAImH_EczAdZ2hFqxRqGBrV7tDWWIlWPcVsJxQADxnVAYS0kD9afNEuQRc6iiOONwuUiKjqX9U4RcAASopJz7VKN8Rnil1e4_fe01CDWA__3NKN7wL450YulaPdNgozt0OOwLQJ9Zw=s1080-no",
      "https://lh3.googleusercontent.com/pw/AM-JKLV7TvNQ5eFsAjkF1OCVR8oTHGeW4iftbFHaf6NL1MKyC3G9IeZU1c38ENLCsXi2kxnwaVML_EutFf4dTEVCgoaJ1to_Y-Gfq1dD3_yc-G7uWpg-TV0oaI21DgSUjMt1jgETPHukIo7AjEMO0Tz6fYQK=s1080-no",
      "https://lh3.googleusercontent.com/pw/AM-JKLVje_jahAOCxFBhMeWJaP2QlqsrFErxPfJWPZJ2seKh-kHqbCwfw5vJI70IW44ax31t16kUDQcYLZMnwnzslYUGvAn2EP1sS8mNDjYZDW_eI-28FVrbf0se22mDpU-ZOS0vCUux9HEAnyo-50G91b5b=s1080-no",
      "https://lh3.googleusercontent.com/pw/AM-JKLWtmyoI-4ieFleNiT1uPTQy2jXoYC-a5aokwTb7WAUi-iQQ-xb0vOu28rxbGXYDNVRnTKEZyTC_7x3SStfVMJZresseuK0eyHX1irtR5eo0w9SEKw1ToSiI-jyLwvmiRLhNLTlHkfZdUwIu9L_XQGZc=s1080-no",
    ],
    author: tmpUser,
    isAuthor: true,
    location: {
      wideAddr: "서울특별시",
      localAddr: "종로구",
    },
    createdAt: new Date("2021-12-13T16:00:00Z"),
    updatedAt: new Date("2021-12-14T18:00:00Z"),
    likes: 8,
  };
}

export async function fetchPostListData() {
  return [
    {
      id: "61b9768f8c12d364584838aa",
      wideAddr: "서울특별시",
      localAddr: "종로구",
      photo:
        "https://lh3.googleusercontent.com/pw/AM-JKLV7TvNQ5eFsAjkF1OCVR8oTHGeW4iftbFHaf6NL1MKyC3G9IeZU1c38ENLCsXi2kxnwaVML_EutFf4dTEVCgoaJ1to_Y-Gfq1dD3_yc-G7uWpg-TV0oaI21DgSUjMt1jgETPHukIo7AjEMO0Tz6fYQK=s1080-no",
      title: "title-0",
      likes: 24,
    },
    {
      id: "61b97a5449807cf11d466513",
      wideAddr: "서울특별시",
      localAddr: "종로구",
      photo:
        "https://lh3.googleusercontent.com/pw/AM-JKLUU3lh8tC1cq7puzYNmkwcPgS7BDNvPzsn16pkzlNtqkNrb-dYuUiv0LPqpUb1pV84bzciY0REMHboqsYZIBOZiU8Pt7o9WcrmdeRQOEq4pWep-fDH23mCTr6Dc5qBrZJGM-aYIyAPI34qW6vmsEqVK=s1080-no",
      title: "title-0",
      likes: 16,
    },
  ];
}

export async function fetchUserData() {
  return tmpUser;
}

export async function fetchAddressData() {
  return dummyAddress;
}

export async function fetchAddressAPI(longitude, latitude) {
  const request = {
    method: "GET",
    headers: {
      Authorization: `KakaoAK 4be5731b9445ebbbc4acf16e9d6f0588`,
    },
  };

  const URL = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`;
  try {
    const address = await fetch(URL, request)
      .then((res) => res.json())
      .then((res) => {
        const { documents: regionType } = res;
        const legalDivision = regionType[0];
        return legalDivision;
      });

    const { region_1depth_name: wide_addr, region_2depth_name: local_addr } =
      address;
    return [wide_addr, local_addr];
  } catch (e) {
    console.log("API가 정상적으로 호출되지 않았습니다.");
  }
}
