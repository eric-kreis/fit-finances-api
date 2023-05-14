import { CashflowType } from '@domain/cashflow/cashflow-type.enum';
import { DateWithoutTime } from '@shared/decorators/transformers/date-without-time.decorator';
import { ArrayMinSize, IsDate, IsEnum, IsNumber, IsOptional, IsPositive, IsString, MaxLength } from 'class-validator';

export class CreateCashflowDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsDate()
  @DateWithoutTime()
  effectiveDate: Date;

  @IsOptional()
  @MaxLength(100)
  @IsString()
  description?: string | null;

  @IsString({ each: true })
  @ArrayMinSize(1)
  tags: string[];

  @IsEnum(CashflowType)
  type: CashflowType;
}
