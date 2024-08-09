export type ApiResponseError = {
  type: string;
  message: string;
};

export type ApiResponse<T = unknown> = {
  errors?: ApiResponseError[];
  data?: T;
};

