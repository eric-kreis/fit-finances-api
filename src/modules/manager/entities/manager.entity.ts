import { Manager } from '@domain/manager/manager';
import { ApiProperty } from '@nestjs/swagger';

export class ManagerEntity implements Manager {
  @ApiProperty({
    description: 'Identificador único do gestor',
  })
  public readonly id: string;

  @ApiProperty({
    description: 'Data em que o gestor foi criado',
  })
  public readonly createdAt: Date;

  @ApiProperty({
    description: 'Última data dea atualização',
  })
  public readonly updatedAt: Date;

  @ApiProperty({
    description: 'Email do gestor',
  })
  public readonly email: string;
}
