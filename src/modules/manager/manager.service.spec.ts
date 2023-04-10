import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';
import { managerMock } from '@mocks/manager.mock';
import { Manager } from '@domain/manager/manager';
import { ManagerRepository } from '@domain/manager/manager.repository';
import { ManagerNotFoundException } from '@domain/manager/exceptions/manager-not-found.exception';
import { ManagerService } from './manager.service';

const managerRepositoryMock = mockDeep<ManagerRepository>();

describe('ManagerService', () => {
  let sut: ManagerService;
  let managerRepository: DeepMockProxy<ManagerRepository>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ManagerService,
        {
          provide: ManagerRepository,
          useValue: managerRepositoryMock,
        },
      ],
    }).compile();

    sut = module.get<ManagerService>(ManagerService);
    managerRepository = module.get<DeepMockProxy<ManagerRepository>>(ManagerRepository);
  });

  beforeEach(() => {
    mockReset(managerRepository);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(sut.findByCredentials);
    expect(sut.update);
  });

  describe('findByCredentials', () => {
    it('should return a manager', async () => {
      managerRepository.findByCredentials.mockResolvedValue(managerMock);

      expect.assertions(3);

      const manager = await sut.findByCredentials(managerMock.email, 'pass');

      expect(managerRepository.findByCredentials).toHaveBeenCalledTimes(1);
      expect(manager).toEqual(managerMock);
      expect(manager).toBeInstanceOf(Manager);
    });

    it('should throw a manager not found exception', async () => {
      managerRepository.findByCredentials.mockResolvedValue(null);

      expect.assertions(2);

      try {
        await sut.findByCredentials(managerMock.email, 'pass');
      } catch (e) {
        expect(managerRepository.findByCredentials).toHaveBeenCalledTimes(1);
        expect(e).toBeInstanceOf(ManagerNotFoundException);
      }
    });
  });
});
