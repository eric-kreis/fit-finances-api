import { Member } from '@domain/member/member';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MemberEntity implements Member {
  @ApiProperty({
    description: 'Identificador único do membro',
  })
  public readonly id: string;

  @ApiProperty({
    description: 'Data em que o membro foi criado',
  })
  public readonly createdAt: Date;

  @ApiProperty({
    description: 'Última data de atualização',
  })
  public readonly updatedAt: Date;

  @ApiProperty({
    description: 'CPF do membro',
  })
  public readonly cpf: string;

  @ApiProperty({
    description: 'Email do membro',
  })
  public readonly email: string;

  @ApiProperty({
    description: 'Nome do membro',
  })
  public readonly name: string;

  @ApiPropertyOptional({
    description: 'Número de telefone do membro',
    anyOf: [{ type: 'string' }, { type: 'null' }],
  })
  public readonly phoneNumber: string | null;
}
