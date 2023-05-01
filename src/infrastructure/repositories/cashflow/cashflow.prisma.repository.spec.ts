import { Test, TestingModule } from '@nestjs/testing';
import { prismaMock } from '@mocks/prisma/singleton';
import { DeepMockProxy } from 'jest-mock-extended';
import { PrismaService } from '../../prisma.service';
import { CashflowPrismaRepository } from './cashflow.prisma.repository';

describe('CashflowPrismaRepository', () => {
  let sut: CashflowPrismaRepository;
  let prismaService: DeepMockProxy<PrismaService>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CashflowPrismaRepository,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    sut = module.get<CashflowPrismaRepository>(CashflowPrismaRepository);
    prismaService = module.get<DeepMockProxy<PrismaService>>(PrismaService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(sut.create).toBeDefined();
    expect(sut.findMany).toBeDefined();
    expect(sut.findById).toBeDefined();
    expect(sut.delete).toBeDefined();
  });
});
