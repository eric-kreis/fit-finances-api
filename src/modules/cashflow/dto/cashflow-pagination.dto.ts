import { Cashflow } from '@domain/cashflow/cashflow';
import { CashflowKeys } from '@domain/cashflow/cashflow-keys.enum';
import { CashflowType } from '@domain/cashflow/cashflow-type.enum';
import { PaginationDto } from '@shared/dtos/pagination.dto';
import { IsEnum, IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class CashflowPaginationDto extends PaginationDto<Cashflow> {
  @IsOptional()
  @IsIn(Object.keys(CashflowKeys))
  orderBy: keyof Cashflow = 'createdAt';

  @IsOptional()
  @IsNotEmpty()
  search?: string;

  @IsOptional()
  @IsEnum(CashflowType)
  type?: CashflowType;
}
