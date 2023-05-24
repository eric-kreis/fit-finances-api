import { CashflowType } from '@domain/cashflow/cashflow-type.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class CashflowTagQueryDto {
  @ApiPropertyOptional({
    description: 'Campo para encontrar tags de acordo com seu nome',
  })
  @IsOptional()
  @IsNotEmpty()
  search?: string;

  @ApiPropertyOptional({
    description: 'Campo para filtrar tags de acordo com seu tipo',
    enum: CashflowType,
  })
  @IsOptional()
  @IsEnum(CashflowType)
  type?: CashflowType;
}
