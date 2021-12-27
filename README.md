# 이거 먹어봄?

대한민국 방방곳곳 맛집자랑 SNS

## 프로젝트 구성 안내

### 1. 프로젝트 소개

- 기술 스택

  | 구성     | 기술 스택           |
  | -------- | ------------------- |
  | Frontend | Typescript          |
  | Backend  | Node JS, Express JS |
  | Database | Mongo DB, mongoose  |
  | Server   | nginx, VM azure     |
  | Test     | Jest                |

- 웹서비스에 대한 자세한 개요

  의식주는 사람의 생활에서 아주 중요한 세 가지로, 특히 `식`은 다른 두 가지와 비교할 수 없는 행복감을 준다. <br>
  `이거 먹어봄?`은 우리 동네 그리고 여행지에서 다른 이들에게 `식`의 이정표를 세워주고, 나의 기록을 새겨둔다. <br>

### 2. 프로젝트 목표

- 프로젝트 아이디어 동기

  팀원들의 관심사를 함께 나눴을 때, **여행에 대한 관심사**가 많이 나왔습니다. <br>
  여행을 **기록**하는 방법에 대해 고민하게 되었습니다. <br>

- 문제를 해결하기 위한 특정 질문 명시

  Q. 모든 여행 기록을 기록할 수 있는가?<br>
  A. 모든 여행을 기록하기보다 **먹는 것 중심으로 기록**하면 좋겠다고 생각했습니다.<br>

  Q. 개인적인 기록 웹 페이지를 제작할 것인가? <br>
  A. **소셜 기능**으로 다른 사람들과 의견을 나눌 수 있는 것이 좋겠다고 생각했습니다..<br>

### 3. 프로젝트 기능 설명

#### 주요 기능

1. 지역 별 맛있는 음식 사진 포스팅

   ```txt
    지역 별로 맛있음 음식 사진들을 공유할 수 있습니다.
    내가 아는 숨은 맛집, 그 지역 만의 먹거리를 다른 사람들과 함께 공유할 수 있습니다!
   ```

2. 좋아요 기능

   ```txt
    게시글에 SNS의 꽃과 같은 좋아요 기능을 추가했습니다.
    간편하게 나의 마음을 표현할 수 있습니다.🙋🏻
   ```

3. 댓글 기능

   ```txt
    좋아요 기능과 함께 SNS의 잔디와 같은 댓글 기능을 추가했습니다.
    좋아요가 간편하게 나의 마음을 표현할 수 있다면, 댓글은 더 많은 표현을 담을 수 있습니다.
    ❌악플 금지❌
   ```

#### 서브 기능

1. 지역 검색 기능

   ```txt
    검색 창을 이용해 원하는 지역의 게시글을 확인할 수 있습니다.
    🔥자동완성🔥까지 해주는 똑똑한 검색 창!
   ```

2. 사진 업로드시 지역 자동완성

   ```txt
    사진 업로드 시 사진의 메타 정보를 가져와 지역을 자동으로 완성시켜줍니다.
    아쉽지만 메타 정보가 손상되거나 없다면 직접 입력해야 합니다.🥲
   ```

3. 유저 기능

   ```txt
    로그인을 통해 더 많은 유저 기능을 사용할 수 있습니다.
    구글 로그인을 통해 간편하게 로그인할 수 있습니다! 👍🏻
    로그인한 유저에게는 개인 페이지를 이용해
    내가 작성한 글, 내가 좋아요한 글, 내가 쓴 댓글을 모아볼 수 있습니다.
   ```

#### 프로젝트만의 차별점, 기대효과

1. 차별점

   - 기존의 비슷한 웹 서비스들은 식당 별로 정리되어 있습니다. 저희는 지역 별로 정리되어 있어 여행 계획에서 쉽게 정리해서 볼 수 있습니다.
   - 단순히 리뷰 형식의 리뷰 페이지가 아니라 소셜 기능을 강화해 서로 소통할 수 있는 공간을 구성했습니다.

2. 기대효과

   - 지역 별로 숨겨진 맛집이나 지역 별미 들을 함께 공유할 수 있습니다.
   - 여행 계획 준비에 큰 도움이 될 수 있습니다.

### 4. 프로젝트 구성도

- [Figma](https://www.figma.com/file/C8Sw3jVVoyYRQqfCUmrwib/Untitled?node-id=2%3A9)

### 5. 프로젝트 팀원 역할 분담

| 이름   | 담당 업무              |
| ------ | ---------------------- |
| 구영표 | 팀장 / 프론트엔드 개발 |
| 김희진 | 프론트엔드 개발        |
| 안영우 | 프론트엔드 개발        |
| 이희재 | 프론트엔드 개발        |
| 장지성 | 백엔드 개발            |
| 정세영 | 백엔드 개발            |

**멤버별 responsibility**

1. 팀장

- 기획 단계: 구체적인 설계, 프로젝트 기획서 작성
- 개발 단계: 팀원간의 일정 등 조율
- 수정 단계: 기획, 스크럼 진행, 코치님 피드백 반영해서 수정, 발표 준비

2. 프론트엔드

- 기획 단계: 와이어프레임 작성, 큰 주제에서 문제 해결 아이디어 도출
- 개발 단계: 와이어프레임 기반으로 구현, UI/UX 디자인
- 수정 단계: 코치님 피드백 반영해서 프론트엔드 디자인 수정

3. 백엔드

- 기획 단계: DB, API 설계, 큰 주제에서 문제 해결 아이디어 도출
- 개발 단계: DB 구축, API 서버 구축
- 수정 단계: 피드백 반영해서 백엔드 설계 / 기능 수정

### 6. 버전

2021.12.14. v1.0.0 - alpha\
2022.12.24. v1.0.1 - beta\
2023.12.25. v1.1.0 - release1\
2024.12.26. v1.1.1 - release2

### 7. 문서

- [위키](https://kdt-gitlab.elice.io/sw-001-project/team2/have-u-tried-this/-/wikis/home)
- [노션](https://www.notion.so/elice/2-b52db7508f694b17b35bd286cf008e27)
