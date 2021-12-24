export const addressData = {
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

export const userData = {
  nickname: "John Doe",
  profile:
    "https://lh3.googleusercontent.com/a/AATXAJxUzSTmgJx8JAf1CvXu_udg9ZXeT7xondn0svFd=s32-p-no",
  createdAt: "2021-12-10T16:00:00Z",
  updatedAt: "2021-12-13T16:00:00Z",
  lastLoginAt: "2021-12-13T16:00:00Z",
  isActive: true,
};

export const locationListData = [
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

export const postData = {
  title: "My First Post",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi aliquam consequat tempus. Pellentesque id diam a eros tristique viverra. Curabitur dolor nulla, vestibulum ac leo a, auctor lobortis ipsum. Pellentesque tempor ex ac aliquam bibendum. Suspendisse non nisi ut ante rutrum aliquam. Aenean suscipit erat tortor, eu sagittis ligula rhoncus id. In mattis, arcu vitae varius mollis, augue turpis volutpat libero, a imperdiet metus ligula quis orci. Maecenas eget libero eu nunc iaculis facilisis. Duis vulputate interdum semper. Nulla luctus neque eget leo porttitor, a hendrerit velit pretium. Aliquam dignissim, felis vitae ultricies efficitur, massa lectus condimentum dolor, tristique laoreet orci velit eu metus.",
  pictures: [
    "https://lh3.googleusercontent.com/pw/AM-JKLVfOfjssCkIIOJAImH_EczAdZ2hFqxRqGBrV7tDWWIlWPcVsJxQADxnVAYS0kD9afNEuQRc6iiOONwuUiKjqX9U4RcAASopJz7VKN8Rnil1e4_fe01CDWA__3NKN7wL450YulaPdNgozt0OOwLQJ9Zw=s1080-no",
    "https://lh3.googleusercontent.com/pw/AM-JKLV7TvNQ5eFsAjkF1OCVR8oTHGeW4iftbFHaf6NL1MKyC3G9IeZU1c38ENLCsXi2kxnwaVML_EutFf4dTEVCgoaJ1to_Y-Gfq1dD3_yc-G7uWpg-TV0oaI21DgSUjMt1jgETPHukIo7AjEMO0Tz6fYQK=s1080-no",
    "https://lh3.googleusercontent.com/pw/AM-JKLVje_jahAOCxFBhMeWJaP2QlqsrFErxPfJWPZJ2seKh-kHqbCwfw5vJI70IW44ax31t16kUDQcYLZMnwnzslYUGvAn2EP1sS8mNDjYZDW_eI-28FVrbf0se22mDpU-ZOS0vCUux9HEAnyo-50G91b5b=s1080-no",
    "https://lh3.googleusercontent.com/pw/AM-JKLWtmyoI-4ieFleNiT1uPTQy2jXoYC-a5aokwTb7WAUi-iQQ-xb0vOu28rxbGXYDNVRnTKEZyTC_7x3SStfVMJZresseuK0eyHX1irtR5eo0w9SEKw1ToSiI-jyLwvmiRLhNLTlHkfZdUwIu9L_XQGZc=s1080-no",
  ],
  author: userData,
  isAuthor: true,
  location: {
    wideAddr: "서울특별시",
    localAddr: "종로구",
  },
  createdAt: "2021-12-16T03:07:30.754Z",
  updatedAt: "2021-12-18T03:07:30.754Z",
  likes: 8,
};

<<<<<<< HEAD
export const getUserCommentData = () => ({
  data: [
    {
      commentId: "61c2ebbbabbd7b2c61d4c7",
      postId: "61c2ebbbabbd7b2c61d4c700",
      photo:
        "https://lh3.googleusercontent.com/pw/AM-JKLV7TvNQ5eFsAjkF1OCVR8oTHGeW4iftbFHaf6NL1MKyC3G9IeZU1c38ENLCsXi2kxnwaVML_EutFf4dTEVCgoaJ1to_Y-Gfq1dD3_yc-G7uWpg-TV0oaI21DgSUjMt1jgETPHukIo7AjEMO0Tz6fYQK=s1080-no",
      title: "무슨무슨식당",
      comment: "쏼라쏼라",
    },
  ],
  pagination: {
    page: 1,
    nextPage: false,
  },
});
=======
export const imagesData = [
  "https://lh3.googleusercontent.com/pw/AM-JKLXk7n1SrdopnJhjMi3uwZmt-nSDrHrUXqHoINdA4FdCbEgux1XRLevp5_BM_rGy3_MiaQM2c8syTjBNscXTI5Vnop0mk5cklfl29KLXSLXILyfJL7Od8ARORxAtDvnXepRlE2cTuVn51rXucO17SkfS=s1080-no",
  "https://lh3.googleusercontent.com/pw/AM-JKLXfccn5mZTKSf-b_SPvrIzp5HgSm2rss5Ui5kYUDx7AbvKFAjvmsL7aOn5WKfivyq8ySgIAbplX1dluE6KzdHVTJIZ_PwexouWlIsRcQQXP35fGolpw7y7WLUIVK5Mxm8OlG55Ifm-9QJsooFOCiLj8=s1080-no",
  "https://lh3.googleusercontent.com/pw/AM-JKLUa4jO3qiRGgu5j08eUdS_TDyfV4ptwz6Al-10teooFmgWDY882NpAQJ0_Rfd9nAuda_No48oZT0EDle8f7ZxRZA206VVhByt3lIqn3lfcJ3Llh27q475Gt1i-bWE5l_Ccq7rW7LlkYLFx8M69zzvBX=s1080-no",
  "https://lh3.googleusercontent.com/pw/AM-JKLUM-B7IJe7GGNBR19n3bbuiNdqFreAmYGyCh64ciNMcZPg9-Kf9fyQdayVWcXo0QhAdN6gsWB7SQ9sz8h4zIsAPWw4WrZSRO5NhH0qWQb7IvnfC4JsRfZx-VsmwtgaIQ1uTe1RE0yPnp2Jpgw8AC79a=s1080-no",
  "https://lh3.googleusercontent.com/pw/AM-JKLVSPws8f15B4_y0ruVkL8l9etJnya9sbth71MoWo3042V54lpjfCWEcANcc6NkOTXZFytUoASloS8EFPiYt2nCBEKPpNZdiMVM4mXE3SgJ2AvEP9DzzXLgWfB3VVmhiwZFGf16I12BWWu0GdZ9sUw34=s1080-no",
  "https://i.imgur.com/kqOj5QG.jpg",
];
>>>>>>> 54c73a672a30b1eec4b263c16817c1fe15b7a56f
