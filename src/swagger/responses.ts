import { ApiResponse } from '@nestjs/swagger';
import { HttpStatus, Type } from '@nestjs/common';
import { BadRequestException } from './bad-request.exception';

export const SuccessSwagger = (type: Type<unknown>) => ApiResponse({
  type,
  status: HttpStatus.OK,
});

export const BadRequestSwagger = () => ApiResponse({
  type: BadRequestException,
  status: HttpStatus.BAD_REQUEST,
});

export const UnauthorizedSwagger = () => ApiResponse({
  type: BadRequestException,
  status: HttpStatus.UNAUTHORIZED,
  description: 'Expired or invalid access token',
});
