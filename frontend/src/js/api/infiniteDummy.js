const http = require("http");

const server = http
  .createServer((req, res) => {
    const { url } = req;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    if (url === "/tmp?page=8") {
      res.end(
        JSON.stringify({
          data: [
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
            {
              id: "61b97a5449807cf11d4se513",
              wideAddr: "서울특별시",
              localAddr: "도봉구",
              photo:
                "https://i.pinimg.com/236x/bc/17/47/bc174762d5c9781e2cb81678e675993b.jpg",
              title: "title",
              likes: 1,
            },
            {
              id: "61b97a5449807cf11d466511",
              wideAddr: "서울특별시",
              localAddr: "도봉구",
              photo:
                "https://i.pinimg.com/236x/94/0b/55/940b55f6bb5b85d0c7f73e74c028f92f.jpg",
              title: "title",
              likes: 2,
            },
            {
              id: "61b97a5449807cf11d464213",
              wideAddr: "서울특별시",
              localAddr: "도봉구",
              photo:
                "https://i.pinimg.com/236x/92/ad/5f/92ad5fcc1061c412e587240f05a02205.jpg",
              title: "title",
              likes: 3,
            },
            {
              id: "61b97a5449807cf11d466533",
              wideAddr: "서울특별시",
              localAddr: "도봉구",
              photo:
                "https://i.pinimg.com/236x/b3/e9/4f/b3e94fbb9800dec90c999322bb868b50.jpg",
              title: "title",
              likes: 4,
            },
            {
              id: "61b97a5449807cf11d4665fq",
              wideAddr: "서울특별시",
              localAddr: "도봉구",
              photo:
                "https://i.pinimg.com/236x/71/e9/7f/71e97f4190c54436253c41adde76685a.jpg",
              title: "title",
              likes: 5,
            },
            {
              id: "61b97a5449807cf11d46652g",
              wideAddr: "서울특별시",
              localAddr: "도봉구",
              photo:
                "https://i.pinimg.com/236x/4d/d5/1e/4dd51eb8fd82a6bbb8cada5a4f4a9389.jpg",
              title: "title",
              likes: 6,
            },
            {
              id: "61b97a5449807cf11d4663f3",
              wideAddr: "서울특별시",
              localAddr: "도봉구",
              photo:
                "https://i.pinimg.com/236x/cf/38/f7/cf38f755f368303107f6df35841bcd80.jpg",
              title: "title",
              likes: 7,
            },
            {
              id: "61b97a5449807cf11d4664h3",
              wideAddr: "인천광역시",
              localAddr: "부평구",
              photo:
                "https://i.pinimg.com/236x/de/6a/bb/de6abb7c87cb732948f15f020a74d229.jpg",
              title: "title",
              likes: 8,
            },
            {
              id: "61b97a5449807cf11d461d13",
              wideAddr: "부산광역시",
              localAddr: "남구",
              photo:
                "https://i.pinimg.com/236x/ce/e7/3b/cee73b88e5fe81614416aaa33ee8f3f1.jpg",
              title: "title",
              likes: 9,
            },
            {
              id: "61b97a5449807cf113d76513",
              wideAddr: "서울특별시",
              localAddr: "도봉구",
              photo:
                "https://i.pinimg.com/236x/45/9a/1d/459a1d460db6ca5c854cf051adb25ee0.jpg",
              title: "title",
              likes: 10,
            },
          ],
          pagination: {
            nextPage: false,
          },
        }),
      );
    } else {
      res.end(
        JSON.stringify({
          data: [
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
            {
              id: "61b97a5449807cf11d4se513",
              wideAddr: "서울특별시",
              localAddr: "도봉구",
              photo:
                "https://i.pinimg.com/236x/bc/17/47/bc174762d5c9781e2cb81678e675993b.jpg",
              title: "title",
              likes: 1,
            },
            {
              id: "61b97a5449807cf11d466511",
              wideAddr: "서울특별시",
              localAddr: "도봉구",
              photo:
                "https://i.pinimg.com/236x/94/0b/55/940b55f6bb5b85d0c7f73e74c028f92f.jpg",
              title: "title",
              likes: 2,
            },
            {
              id: "61b97a5449807cf11d464213",
              wideAddr: "서울특별시",
              localAddr: "도봉구",
              photo:
                "https://i.pinimg.com/236x/92/ad/5f/92ad5fcc1061c412e587240f05a02205.jpg",
              title: "title",
              likes: 3,
            },
            {
              id: "61b97a5449807cf11d466533",
              wideAddr: "서울특별시",
              localAddr: "도봉구",
              photo:
                "https://i.pinimg.com/236x/b3/e9/4f/b3e94fbb9800dec90c999322bb868b50.jpg",
              title: "title",
              likes: 4,
            },
            {
              id: "61b97a5449807cf11d4665fq",
              wideAddr: "서울특별시",
              localAddr: "도봉구",
              photo:
                "https://i.pinimg.com/236x/71/e9/7f/71e97f4190c54436253c41adde76685a.jpg",
              title: "title",
              likes: 5,
            },
            {
              id: "61b97a5449807cf11d46652g",
              wideAddr: "서울특별시",
              localAddr: "도봉구",
              photo:
                "https://i.pinimg.com/236x/4d/d5/1e/4dd51eb8fd82a6bbb8cada5a4f4a9389.jpg",
              title: "title",
              likes: 6,
            },
            {
              id: "61b97a5449807cf11d4663f3",
              wideAddr: "서울특별시",
              localAddr: "도봉구",
              photo:
                "https://i.pinimg.com/236x/cf/38/f7/cf38f755f368303107f6df35841bcd80.jpg",
              title: "title",
              likes: 7,
            },
            {
              id: "61b97a5449807cf11d4664h3",
              wideAddr: "인천광역시",
              localAddr: "부평구",
              photo:
                "https://i.pinimg.com/236x/de/6a/bb/de6abb7c87cb732948f15f020a74d229.jpg",
              title: "title",
              likes: 8,
            },
            {
              id: "61b97a5449807cf11d461d13",
              wideAddr: "부산광역시",
              localAddr: "남구",
              photo:
                "https://i.pinimg.com/236x/ce/e7/3b/cee73b88e5fe81614416aaa33ee8f3f1.jpg",
              title: "title",
              likes: 9,
            },
            {
              id: "61b97a5449807cf113d76513",
              wideAddr: "서울특별시",
              localAddr: "도봉구",
              photo:
                "https://i.pinimg.com/236x/45/9a/1d/459a1d460db6ca5c854cf051adb25ee0.jpg",
              title: "title",
              likes: 10,
            },
          ],
          pagination: {
            nextPage: true,
          },
        }),
      );
    }
  })
  .listen(9980);
