import { ApiResponse } from '@nestjs/swagger';
import { HttpStatus, Type } from '@nestjs/common';
import { BadRequestResponse } from './bad-request.response';
import { HttpErrorResponse } from './http-error.response';

export const SuccessSwagger = (
  options: {
    type?: Type<unknown> | Function | [Function] | string,
    description?: string,
  },
  status: HttpStatus = HttpStatus.OK,
) => ApiResponse({
  status,
  ...options,
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

export const ForbiddenSwagger = () => ApiResponse({
  type: HttpErrorResponse,
  status: HttpStatus.FORBIDDEN,
  description: 'Permissões insuficientes',
});

export const NotFoundSwagger = () => ApiResponse({
  type: HttpErrorResponse,
  status: HttpStatus.NOT_FOUND,
  description: 'Entidade não encontrada',
});

export const ConflictSwagger = () => ApiResponse({
  type: HttpErrorResponse,
  status: HttpStatus.CONFLICT,
  description: 'Entidade já registrada',
});
