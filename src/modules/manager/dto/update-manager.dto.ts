import { OptionalUndefined } from '@shared/decorators/validators/optional-undefined.decorator';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class UpdateManagerDto {
  @OptionalUndefined()
  @IsEmail()
  email?: string;

  @OptionalUndefined()
  @IsString()
  @MinLength(8)
  password?: string;
}
