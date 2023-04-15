import { ApiPropertyOptional } from '@nestjs/swagger';
import { OptionalUndefined } from '@shared/decorators/validators/optional-undefined.decorator';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class UpdateManagerDto {
  @ApiPropertyOptional({ description: 'Manager email' })
  @OptionalUndefined()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ description: 'Manager password', minLength: 8 })
  @OptionalUndefined()
  @IsString()
  @MinLength(8)
  password?: string;
}
