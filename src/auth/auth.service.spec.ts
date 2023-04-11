import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { ManagerService } from '@domain/manager/manager.service';
import { authUserMock } from '@mocks/auth.mock';
import { managerMock } from '@mocks/manager.mock';
import { AuthService } from './auth.service';
import { AuthUserEntity } from './entities/auth-user.entity';

const jwtServiceMock = mockDeep<JwtService>();
const managerServiceMock = mockDeep<ManagerService>();

describe('AuthService', () => {
  let sut: AuthService;
  let jwtService: DeepMockProxy<JwtService>;
  let managerService: DeepMockProxy<ManagerService>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
        {
          provide: ManagerService,
          useValue: managerServiceMock,
        },
      ],
    }).compile();

    sut = module.get<AuthService>(AuthService);
    jwtService = module.get<DeepMockProxy<JwtService>>(JwtService);
    managerService = module.get<DeepMockProxy<ManagerService>>(ManagerService);
  });

  beforeEach(() => {
    mockReset(jwtService);
    mockReset(managerService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(sut.login).toBeDefined();
    expect(sut.getCurrentProfile).toBeDefined();
  });

  describe('login()', () => {
    it('should return a manager with token', async () => {
      jwtService.sign.mockReturnValue(authUserMock.accessToken);
      managerService.findByCredentials.mockResolvedValue(managerMock);

      expect.assertions(4);

      const authUser = await sut.login({ email: managerMock.email, password: '' });

      expect(jwtService.sign).toHaveBeenCalledTimes(1);
      expect(managerService.findByCredentials).toHaveBeenCalledTimes(1);
      expect(authUser).toEqual(authUserMock);
      expect(authUser).toBeInstanceOf(AuthUserEntity);
    });
  });

  describe('getCurrentProfile()', () => {
    it('should return a manager with token', async () => {
      jwtService.sign.mockReturnValue(authUserMock.accessToken);

      expect.assertions(3);

      const authUser = await sut.getCurrentProfile(authUserMock.user);

      expect(jwtService.sign).toHaveBeenCalledTimes(1);
      expect(authUser).toEqual(authUserMock);
      expect(authUser).toBeInstanceOf(AuthUserEntity);
    });
  });
});
