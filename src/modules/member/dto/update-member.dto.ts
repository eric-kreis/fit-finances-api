import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsCpf } from '@shared/decorators/validators/is-cpf.decorator';
import { OptionalUndefined } from '@shared/decorators/validators/optional-undefined.decorator';
import { IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateMemberDto {
  @ApiPropertyOptional({ description: 'Email do membro' })
  @OptionalUndefined()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ description: 'CPF do membro' })
  @OptionalUndefined()
  @IsCpf()
  cpf?: string;

  @ApiPropertyOptional({ description: 'Nome do membro' })
  @OptionalUndefined()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiPropertyOptional({ description: 'Número de telefone do membero', nullable: true })
  @IsOptional()
  @IsMobilePhone('pt-BR')
  phoneNumber: string | null;
}
