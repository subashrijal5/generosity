import type { HttpStatusCode } from "~/enums/common";

export type THttpResponse<T> = {
  success: boolean;
  message: string;
  responseObject: T;
  statusCode: HttpStatusCode;
};

export type THttpError = {
  success: boolean;
  message: string;
  statusCode: HttpStatusCode;
};
