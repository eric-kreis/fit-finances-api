import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'Email do gestor' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Senha do gestor' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
