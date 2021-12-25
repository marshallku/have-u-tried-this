interface ApiErrorResponse {
  error: true;
  message: string;
}

interface ILocationList {
  [key: string]: Array<string>;
}

interface LocationsAllResponse extends ILocation {}

interface IPagination {
  page: number;
  nextPage: boolean;
}

interface ILocation {
  wideAddr: string;
  localAddr: string;
  photo: string;
}

interface LocationsListResponse {
  data: Array<ILocation>;
  pagination: IPagination;
}

interface IPost {
  id: string;
  wideAddr: string;
  localAddr: string;
  photo: string;
  title: string;
  likes: number;
  isLiked: boolean;
}

interface PostListResponse {
  data: Array<IPost>;
  pagination: IPagination;
}

interface IPhoto {
  _id: string;
  url: string;
  text: string;
  filename: string;
}

interface PostCreateResponse {
  title: string;
  contents: string;
  wideAddr: string;
  localAddr: string;
  photos: Array<IPhoto>;
}

interface IAuthor {
  _id: string;
  googleId: string;
  email: string;
  firstName: string;
  lastName: string;
  profile: string;
  source: string;
  lastVisited: string;
}

interface PostDetailResponse {
  post: {
    location: { wideAddr: string; localAddr: string };
    _id: string;
    title: string;
    contents: string;
    photos: Array<IPhoto>;
    author: IAuthor;
    likes: number;
    createdAt: string;
    updatedAt: string;
  };
  isLiked: boolean;
}

interface PostCreateResponse {
  id: string;
}

interface PostModifyResponse {
  id: string;
}

interface PostDeleteResponse {
  success: boolean;
}

interface IComment {
  _id: string;
  author: IAuthor;
  contents: string;
  updatedAt: string;
  createdAt: string;
}

interface CommentListResponse {
  comments: Array<IComment>;
  pagination: IPagination;
}

interface CommentCreateResponse extends IComment {}

interface LikeAddResponse {
  success: boolean;
}

interface IUserComment {
  commentId: string;
  postId: string;
  photo: string;
  title: string;
  comment: string;
}
interface UserCommentListResponse {
  data: Array<IUserComment>;
  pagination: IPagination;
}
