import { ManagerEntity } from '@modules/manager/entities/manager.entity';
import { ApiProperty } from '@nestjs/swagger';

export class AuthUserEntity {
  @ApiProperty({
    description: 'Token de acesso',
  })
  public readonly accessToken: string;

  @ApiProperty({
    type: ManagerEntity,
    description: 'Usuário autenticado',
  })
  public readonly user: ManagerEntity;

  constructor(accessToken: string, user: ManagerEntity) {
    this.accessToken = accessToken;
    this.user = user;
  }
}
