import { Cashflow } from '@domain/cashflow/cashflow';
import { CashflowKeys } from '@domain/cashflow/cashflow-keys.enum';
import { CashflowType } from '@domain/cashflow/cashflow-type.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '@shared/dtos/pagination.dto';
import { IsEnum, IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class CashflowPaginationDto extends PaginationDto<Cashflow> {
  @ApiPropertyOptional({
    description: 'Chave de referência para ordenação',
    enum: CashflowKeys,
    default: CashflowKeys.createdAt,
  })
  @IsOptional()
  @IsIn(Object.keys(CashflowKeys))
  orderBy: keyof Cashflow = 'createdAt';

  @ApiPropertyOptional({
    description: 'Campo de busca utilizado para encontrar registros a partir de suas tags ou descrição',
  })
  @IsOptional()
  @IsNotEmpty()
  search?: string;

  @ApiPropertyOptional({
    description: 'Campo para filtrar registros de acordo com seu tipo',
    enum: CashflowType,
  })
  @IsOptional()
  @IsEnum(CashflowType)
  type?: CashflowType;
}
