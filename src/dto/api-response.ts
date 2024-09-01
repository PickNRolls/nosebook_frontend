export type ApiResponseError = {
  type: string;
  message: string;
};

export type ApiResponse<T = unknown> = {
  ok: boolean;
  errors?: ApiResponseError[];
  data?: T;
};

export type ApiSuccessResponse<T = unknown> = {
  ok: true;
  data: T;
}

export type ApiFailResponse = {
  ok: false;
  errors?: ApiResponseError[];
}

