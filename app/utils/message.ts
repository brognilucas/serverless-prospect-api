import { ResponseVO } from 'app/utils/model/vo/responseVo';

enum StatusCode {
  success = 200,
  notFound = 404, 
  internal = 500, 
  badRequest = 400
}

class Result {
  private statusCode: number;
  private code: number;
  private message: string;
  private data?: unknown;

  constructor(statusCode: number, code: number, message: string, data?: unknown) {
    this.statusCode = statusCode;
    this.code = code;
    this.message = message;
    this.data = data;
  }

  bodyToString () {
    return {
      statusCode: this.statusCode,
      body: JSON.stringify({
        code: this.code,
        message: this.message,
        data: this.data,
      }),
    };
  }
}

export class MessageUtil {
  static success(data: unknown): ResponseVO {
    const result = new Result(StatusCode.success, 0, 'success', data);

    return result.bodyToString();
  }

  static error(code: number, message: string): ResponseVO {
    const httpCode = code === 404 ? StatusCode.notFound : StatusCode.badRequest; 
    const result = new Result(httpCode, code, message); 

    return result.bodyToString();
  }
}
