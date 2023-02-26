import { Response } from 'express';
import {
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  Catch,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const status: number = exception.getStatus();
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();

    response.status(status).json(exception.getResponse());
  }
}
