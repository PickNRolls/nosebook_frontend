'use client';

import { ApiResponse, ApiResponseError } from "@/typings/ApiResponse";

export type Options = {
  handleErrors?: boolean;
};

export class ApiResponseWrapper {
  public constructor(private res: ApiResponse) { }

  public errors(): ApiResponseError[] {
    return this.res?.errors || [];
  }

  public hasErrors(): boolean {
    return Boolean(this.res?.errors && this.res.errors.length);
  }

  public handleError(type: string, handler: (err: ApiResponseError) => void) {
    const err = this.res?.errors?.find(err => err.type === type);
    if (err) {
      handler(err);
    }

    return this.res;
  }
}

export const decorateAction = <Fn extends (...args: any[]) => Promise<ApiResponse>>(
  fn: Fn, options?: Options,
) => async (...args: Parameters<Fn>): Promise<ApiResponseWrapper> => {
  const handleErrors = options?.handleErrors ?? true;

  try {
    const res = await fn(...args);
    const wrapper = new ApiResponseWrapper(res);

    if (handleErrors && wrapper.hasErrors()) {
      console.log(wrapper.errors());
      console.log('handle errors');
    }

    return wrapper;
  } catch (err) {
    console.log('Error in decorated action.');
    console.log(err);
    throw err;
  }
};
