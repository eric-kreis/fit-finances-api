import { CashflowType } from '@domain/cashflow/cashflow-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CashflowEntity {
  @ApiProperty({
    description: 'Identificador único do registro',
  })
  public readonly id: string;

  @ApiProperty({
    description: 'Data em que o registro foi criado',
  })
  public readonly createdAt: Date;

  @ApiProperty({
    description: 'Valor do registro',
  })
  public readonly amount: number;

  @ApiProperty({
    description: 'Descrição do registro',
    example: null,
    nullable: true,
  })
  public readonly description: string | null;

  @ApiProperty({
    description: 'Data de competência do registro',
  })
  public readonly effectiveDate: Date;

  @ApiProperty({
    description: 'Tipo do registro',
    enum: CashflowType,
  })
  public readonly type: CashflowType;

  @ApiProperty({
    description: 'Tags para encontrar o registro',
  })
  public readonly tags: string[];
}
