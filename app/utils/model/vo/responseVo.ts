export class ResponseBodyVO {
  code: number;
  message: string;
  data?: object;
}

export interface ResponseVO {
  statusCode: number;
  body: string;
}
