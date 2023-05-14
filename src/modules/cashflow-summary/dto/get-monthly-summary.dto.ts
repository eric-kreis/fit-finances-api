import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class GetMonthlySummariesDto {
  @ApiProperty({ description: 'Ano de competência' })
  @IsNumber()
  @IsPositive()
  year: number;
}
