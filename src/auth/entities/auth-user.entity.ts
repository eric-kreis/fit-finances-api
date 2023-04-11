import { ManagerEntity } from '@modules/manager/entities/manager.entity';
import { ApiProperty } from '@nestjs/swagger';

export class AuthUserEntity {
  @ApiProperty({
    description: 'Access token to authenticate current user',
  })
  public readonly accessToken: string;

  @ApiProperty({ type: ManagerEntity })
  public readonly user: ManagerEntity;

  constructor(accessToken: string, user: ManagerEntity) {
    this.accessToken = accessToken;
    this.user = user;
  }
}
