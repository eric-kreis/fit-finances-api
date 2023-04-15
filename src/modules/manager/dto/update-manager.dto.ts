import { ApiPropertyOptional } from '@nestjs/swagger';
import { OptionalUndefined } from '@shared/decorators/validators/optional-undefined.decorator';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class UpdateManagerDto {
  @ApiPropertyOptional({ description: 'Email do gestor' })
  @OptionalUndefined()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ description: 'Senha do gestor', minLength: 8 })
  @OptionalUndefined()
  @IsString()
  @MinLength(8)
  password?: string;
}
