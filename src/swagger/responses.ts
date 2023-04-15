import { ApiResponse } from '@nestjs/swagger';
import { HttpStatus, Type } from '@nestjs/common';
import { BadRequestResponse } from './bad-request.response';
import { HttpErrorResponse } from './http-error.response';

export const SuccessSwagger = (type: Type<unknown>) => ApiResponse({
  type,
  status: HttpStatus.OK,
});

export const BadRequestSwagger = () => ApiResponse({
  type: BadRequestResponse,
  status: HttpStatus.BAD_REQUEST,
  description: 'Requisição inválida (sintaxe mal formatada ou valores enviados não aceitos pelo servidor)',
});

export const UnauthorizedSwagger = () => ApiResponse({
  type: HttpErrorResponse,
  status: HttpStatus.UNAUTHORIZED,
  description: 'Token de acesso invalidado ou expirado',
});
