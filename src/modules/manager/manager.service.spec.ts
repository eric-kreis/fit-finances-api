import { Test, TestingModule } from '@nestjs/testing';
import { ManagerRepository } from '@domain/manager/manager.repository';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { ManagerService } from './manager.service';

const managerRepositoryMock = mockDeep<ManagerRepository>();

describe('ManagerService', () => {
  let sut: ManagerService;
  let managerRepository: DeepMockProxy<ManagerRepository>;

  beforeEach(async () => {
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

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(sut.findByCredentials);
    expect(sut.update);
  });
});
