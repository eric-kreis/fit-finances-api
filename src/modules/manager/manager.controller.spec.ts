import { Test, TestingModule } from '@nestjs/testing';
import { ManagerService } from '@domain/manager/manager.service';
import { managerMock } from '@mocks/manager.mock';
import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';
import { ManagerController } from './manager.controller';

const managerServiceMock = mockDeep<ManagerService>();

describe('ManagerController', () => {
  let sut: ManagerController;
  let managerService: DeepMockProxy<ManagerService>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManagerController],
      providers: [
        {
          provide: ManagerService,
          useValue: managerServiceMock,
        },
      ],
    }).compile();

    sut = module.get<ManagerController>(ManagerController);
    managerService = module.get<DeepMockProxy<ManagerService>>(ManagerService);
  });

  beforeEach(() => {
    mockReset(managerService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(sut.updateManager).toBeDefined();
  });

  describe('updateManager()', () => {
    it('should return an updated manager', async () => {
      managerService.update.mockResolvedValue(managerMock);

      expect.assertions(2);

      const updatedManager = await sut.updateManager(
        { id: managerMock.id },
        managerMock,
        { user: managerMock },
      );

      expect(managerService.update).toHaveBeenCalledTimes(1);
      expect(updatedManager).toEqual(managerMock);
    });
  });
});
