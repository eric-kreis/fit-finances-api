import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsPositive } from 'class-validator';

export class GetMonthlySummariesDto {
  @ApiProperty({ description: 'Ano de competência' })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  year: number;
}
