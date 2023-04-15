import { ApiProperty } from '@nestjs/swagger';
import { HttpErrorResponse } from './http-error.response';

export class BadRequestResponse extends HttpErrorResponse {
  @ApiProperty({
    description: 'Razões que ocasionaram o erro',
  })
  reasons: string[];
}
