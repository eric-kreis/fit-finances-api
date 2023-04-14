import { HttpException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class BadRequestException extends HttpException {
  @ApiProperty()
  reasons: string[];
}
