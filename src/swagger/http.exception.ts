import { DomainErrorCode } from '@domain/domain-error-code.enum';
import { ApiProperty } from '@nestjs/swagger';

export class HttpException {
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
