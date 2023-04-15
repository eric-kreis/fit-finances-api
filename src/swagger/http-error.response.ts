import { DomainErrorCode } from '@domain/enums';
import { ApiProperty } from '@nestjs/swagger';

export class HttpErrorResponse {
  @ApiProperty()
  statusCode: number;

  @ApiProperty({ format: 'date-time' })
  timestamp: string;

  @ApiProperty()
  path: string;

  @ApiProperty({ enum: DomainErrorCode, enumName: 'DomainErrorCode' })
  code: DomainErrorCode;

  @ApiProperty()
  message: string;
}
