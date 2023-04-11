import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'Manager email' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Manager password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
