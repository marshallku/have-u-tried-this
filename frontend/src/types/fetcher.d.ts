interface InstanceOptions {
  baseUrl?: string;
  timeOut?: number;
}

interface InstanceError {
  error: boolean;
  message: string;
}

type ApiResponseList =
  | LocationsAllResponse
  | LocationsListResponse
  | PostListResponse
  | PostCreateResponse
  | PostDetailResponse
  | PostModifyResponse
  | PostDeleteResponse
  | CommentListResponse
  | CommentCreateResponse
  | LikeAddResponse;

type ApiResponse<T> = Extract<ApiResponseList, T> | InstanceError;

interface IInstance {
  baseUrl: string | undefined;
  error(message?: string): InstanceError;
  _dummyPromise: Promise<InstanceError>;
  fetch(resource: string, init?: RequestInit): Promise<any | InstanceError>;
  get(resource: string, init?: RequestInit): Promise<any | InstanceError>;
  post(resource: string, init?: RequestInit): Promise<any | InstanceError>;
  delete(resource: string, init?: RequestInit): Promise<any | InstanceError>;
  put(resource: string, init?: RequestInit): Promise<any | InstanceError>;
}
