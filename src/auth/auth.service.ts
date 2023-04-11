import { ManagerService } from '@domain/manager/manager.service';
import { JwtService } from '@nestjs/jwt';
import { Manager } from '@domain/manager/manager';
import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthUserEntity } from './entities/auth-user.entity';

// Should be updated to use refresh tokens
@Injectable()
export class AuthService {
  constructor(
    private readonly _managerService: ManagerService,
    private readonly _jwtService: JwtService,
  ) {}

  public async login({ email, password }: LoginDto): Promise<AuthUserEntity> {
    const manager = await this._managerService.findByCredentials(email, password);
    const accessToken = this._createAccessToken({ ...manager });

    return new AuthUserEntity(accessToken, manager);
  }

  public async getCurrentProfile(manager: Manager): Promise<AuthUserEntity> {
    const accessToken = this._createAccessToken({ ...manager });

    return new AuthUserEntity(accessToken, manager);
  }

  private _createAccessToken(payload: Manager): string {
    return this._jwtService.sign(payload);
  }
}
