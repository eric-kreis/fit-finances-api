import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';
import { managerMock } from '@mocks/manager.mock';
import { ManagerRepository } from '@domain/manager/manager.repository';
import { ManagerNotFoundException } from '@domain/manager/exceptions/manager-not-found.exception';
import { faker } from '@faker-js/faker';
import { ManagerForbiddenException } from '@domain/manager/exceptions/manager-forbidden.exception';
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

  describe('findByCredentials()', () => {
    it('should return a manager', async () => {
      managerRepository.findByCredentials.mockResolvedValue(managerMock);

      expect.assertions(2);

      const manager = await sut.findByCredentials(managerMock.email, faker.internet.password());

      expect(managerRepository.findByCredentials).toHaveBeenCalledTimes(1);
      expect(manager).toEqual(managerMock);
    });

    it('should throw a manager not found exception', async () => {
      managerRepository.findByCredentials.mockResolvedValue(null);

      expect.assertions(2);

      try {
        await sut.findByCredentials(managerMock.email, faker.internet.password());
      } catch (e) {
        expect(managerRepository.findByCredentials).toHaveBeenCalledTimes(1);
        expect(e).toBeInstanceOf(ManagerNotFoundException);
      }
    });
  });

  describe('update()', () => {
    it('should return the updated manager', async () => {
      managerRepository.findById.mockResolvedValue(managerMock);
      managerRepository.update.mockResolvedValue(managerMock);

      expect.assertions(3);

      const manager = await sut.update(managerMock.id, managerMock, managerMock.id);

      expect(managerRepository.findById).toHaveBeenCalledTimes(1);
      expect(managerRepository.update).toHaveBeenCalledTimes(1);
      expect(manager).toEqual(managerMock);
    });

    it('should throw a manager not found exception', async () => {
      managerRepository.findById.mockResolvedValue(null);

      expect.assertions(2);

      try {
        await sut.update(managerMock.id, managerMock, managerMock.id);
      } catch (e) {
        expect(managerRepository.findById).toHaveBeenCalledTimes(1);
        expect(e).toBeInstanceOf(ManagerNotFoundException);
      }
    });

    it('should throw a manager forbidden exception', async () => {
      expect.assertions(2);

      try {
        await sut.update(managerMock.id, managerMock, faker.database.mongodbObjectId());
      } catch (e) {
        expect(managerRepository.findById).toHaveBeenCalledTimes(0);
        expect(e).toBeInstanceOf(ManagerForbiddenException);
      }
    });
  });
});
