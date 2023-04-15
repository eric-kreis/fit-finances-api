import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsCpf } from '@shared/decorators/validators/is-cpf.decorator';
import { IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMemberDto {
  @ApiProperty({ description: 'Email do membro' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'CPF do membro' })
  @IsCpf()
  cpf: string;

  @ApiProperty({ description: 'Nome do membro' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ description: 'Número de telefone do membero', nullable: true })
  @IsOptional()
  @IsMobilePhone('pt-BR')
  phoneNumber: string | null;
}
