import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';
import { authUserMock } from '@mocks/auth.mock';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const authServiceMock = mockDeep<AuthService>();

describe('AuthController', () => {
  let sut: AuthController;
  let authService: DeepMockProxy<AuthService>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
    }).compile();

    sut = module.get<AuthController>(AuthController);
    authService = module.get<DeepMockProxy<AuthService>>(AuthService);
  });

  beforeEach(() => {
    mockReset(authService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(sut.login).toBeDefined();
    expect(sut.getCurrentProfile).toBeDefined();
  });

  describe('login()', () => {
    it('should return the authenticated user', async () => {
      authService.login.mockResolvedValue(authUserMock);

      expect.assertions(3);

      const { user, accessToken } = await sut.login({ email: authUserMock.user.email, password: '' });

      expect(authService.login).toHaveBeenCalledTimes(1);
      expect(user).toEqual(authUserMock.user);
      expect(accessToken).toEqual(authUserMock.accessToken);
    });
  });

  describe('getCurrentProfile()', () => {
    it('should return the authenticated user', async () => {
      authService.getCurrentProfile.mockResolvedValue(authUserMock);

      expect.assertions(3);

      const { user, accessToken } = await sut.getCurrentProfile({ user: authUserMock.user });

      expect(authService.getCurrentProfile).toHaveBeenCalledTimes(1);
      expect(user).toEqual(authUserMock.user);
      expect(accessToken).toEqual(authUserMock.accessToken);
    });
  });
});
