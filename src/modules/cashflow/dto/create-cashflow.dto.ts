import { CashflowType } from '@domain/cashflow/cashflow-type.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DateWithoutTime } from '@shared/decorators/transformers/date-without-time.decorator';
import { ArrayMinSize, IsDate, IsEnum, IsNumber, IsOptional, IsPositive, IsString, MaxLength } from 'class-validator';

export class CreateCashflowDto {
  @ApiProperty({ description: 'Valor do registro' })
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({ description: 'Data de competência do registro' })
  @IsDate()
  @DateWithoutTime()
  effectiveDate: Date;

  @ApiPropertyOptional({ description: 'Descrição do registro', nullable: true, example: null })
  @IsOptional()
  @MaxLength(100)
  @IsString()
  description?: string | null;

  @ApiProperty({ description: 'Tags do registro' })
  @IsString({ each: true })
  @ArrayMinSize(1)
  tags: string[];

  @ApiPropertyOptional({ description: 'Tipo do registro (entrada ou saída)', enum: CashflowType })
  @IsEnum(CashflowType)
  type: CashflowType;
}
