import type { Request, Response } from 'express';
import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DomainException } from '@domain/domain.exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly _logger: Logger) {}

  public catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let code: number = 5555;
    let status: number = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string = 'Internal server error';
    let reasons: string[] | undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const httpMessage = (exception.getResponse() as { message: string }).message;

      if (status === HttpStatus.BAD_REQUEST) {
        reasons = httpMessage as unknown as string[];
        message = 'Bad request';
      } else if (status !== HttpStatus.INTERNAL_SERVER_ERROR) {
        message = httpMessage;
      }
    }

    if (exception instanceof DomainException) {
      const strDomainExceptionCode = exception.code.toString();
      if (strDomainExceptionCode.length < 4) {
        this._logger.error('Invalid domain error code');
      } else {
        status = +strDomainExceptionCode.slice(1);
        code = exception.code;
        message = exception.message;
      }
    }

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this._logger.error(exception);
    }

    const body = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      code,
      message,
      reasons,
    };

    return response.status(status).json(body);
  }
}
