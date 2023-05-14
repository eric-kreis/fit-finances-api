import { ApiProperty } from '@nestjs/swagger';

export class CashflowSummaryEntity {
  @ApiProperty({ description: 'Ano de competência', example: 2022 })
  public readonly year: number;

  @ApiProperty({ description: 'Mês de competência (existe somente se a busca for mensal)', example: 1 })
  public readonly month?: number;

  @ApiProperty({ description: 'Data de competência', example: '1/2022' })
  public readonly fullDate: string;

  @ApiProperty({ description: 'Soma total das entradas em relação ao periodo determinado', example: 33000 })
  public readonly inflows: number;

  @ApiProperty({ description: 'Soma total das saídas em relação ao periodo determinado', example: 23000 })
  public readonly outflows: number;

  @ApiProperty({ description: 'Fluxo de caixa líquido (entradas - saídas) em relação ao periodo determinado', example: 10000 })
  public readonly netCashflow: number;
}
