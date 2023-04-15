import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Manager } from '@domain/manager/manager';
import { NotFoundSwagger, SuccessSwagger, UnauthorizedSwagger } from '@swagger/responses';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthUserEntity } from './entities/auth-user.entity';
import { JwtAuthGuard } from './guards/jwt.guard';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @ApiOperation({
    summary: 'Autentique um usuário',
    description: 'Este recurso deve ser utilizado para autenticar um usuário',
  })
  @SuccessSwagger({
    type: AuthUserEntity,
    description: 'Usuário autenticado com sucesso',
  })
  @NotFoundSwagger()
  @Post('login')
  public async login(@Body() createAuthDto: LoginDto): Promise<AuthUserEntity> {
    return this._authService.login(createAuthDto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Receba o usuário autenticado e renove o token',
    description: 'Utilize este recurso para autenticar um usuário a partir do token de acesso obtido previamente',
  })
  @SuccessSwagger({
    type: AuthUserEntity,
    description: 'Usuário autenticado com sucesso',
  })
  @UnauthorizedSwagger()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  public async getCurrentProfile(@Request() { user }: { user: Manager }): Promise<AuthUserEntity> {
    return this._authService.getCurrentProfile(user);
  }
}
