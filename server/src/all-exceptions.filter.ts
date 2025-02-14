import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { MyLoggerService } from './my-logger/my-logger.service';

type MyResponseObj = {
  statusCode: number;
  timestamp: string;
  path: string;
  response: string | object;
};

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new MyLoggerService(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const myResponseObj: MyResponseObj = {
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: request.url,
      response: '',
    };

    if (exception instanceof HttpException) {
      myResponseObj.statusCode = exception.getStatus();
      myResponseObj.response = exception.getResponse();
    } else if (
      // Typeorm error
      exception instanceof QueryFailedError &&
      exception.message.includes('duplicate key value')
    ) {
      myResponseObj.statusCode = HttpStatus.BAD_REQUEST;
      myResponseObj.response = 'Duplicate session key error';
    } else {
      myResponseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      myResponseObj.response = 'Internal Server Error';
    }

    if (!response.headersSent) {
      response.status(myResponseObj.statusCode).json(myResponseObj);

      this.logger.error(myResponseObj.response, AllExceptionsFilter.name);

      super.catch(exception, host);
    } else {
      this.logger.warn('Response already sent, skipping further actions');
      this.logger.warn(myResponseObj.response, AllExceptionsFilter.name);
    }
  }
}
