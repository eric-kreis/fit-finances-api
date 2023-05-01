import { DeepMockProxy } from 'jest-mock-extended';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateCashflowType } from '@domain/cashflow/cashflow.types';
import { prismaMock } from '@mocks/prisma/singleton';
import { inflowMock, outflowMock, prismaInflowMock } from '@mocks/cashflow.mock';
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

  describe('create()', () => {
    const createInflowData: CreateCashflowType = {
      amount: inflowMock.amount,
      description: inflowMock.description,
      effectiveDate: inflowMock.effectiveDate,
      tags: inflowMock.tags,
      type: inflowMock.type,
    };

    const createOutflowData: CreateCashflowType = {
      amount: outflowMock.amount,
      description: outflowMock.description,
      effectiveDate: outflowMock.effectiveDate,
      tags: outflowMock.tags,
      type: outflowMock.type,
    };

    it('should return a new inflow', async () => {
      prismaService.cashflow.create.mockResolvedValue(prismaInflowMock);

      expect.assertions(3);

      const inflow = await sut.create(createInflowData);

      expect(prismaService.cashflow.create).toHaveBeenCalledTimes(1);
      expect(prismaService.cashflow.create).toHaveBeenLastCalledWith({
        data: {
          amount: createInflowData.amount,
          description: createInflowData.description,
          effectiveDate: createInflowData.effectiveDate,
          tags: {
            connectOrCreate: createInflowData.tags.map((tag) => ({
              where: {
                nameType: { name: tag, type: createInflowData.type },
              },
              create: {
                name: tag,
                type: createInflowData.type,
              },
            })),
          },
          type: createInflowData.type,
        },
        include: {
          tags: true,
        },
      });
      expect(inflow).toEqual(inflowMock);
    });

    it('should return a new inflow', async () => {
      prismaService.cashflow.create.mockResolvedValue(prismaInflowMock);

      expect.assertions(3);

      const inflow = await sut.create(createOutflowData);

      expect(prismaService.cashflow.create).toHaveBeenCalledTimes(1);
      expect(prismaService.cashflow.create).toHaveBeenLastCalledWith({
        data: {
          amount: createOutflowData.amount,
          description: createOutflowData.description,
          effectiveDate: createOutflowData.effectiveDate,
          tags: {
            connectOrCreate: createOutflowData.tags.map((tag) => ({
              where: {
                nameType: { name: tag, type: createOutflowData.type },
              },
              create: {
                name: tag,
                type: createOutflowData.type,
              },
            })),
          },
          type: createOutflowData.type,
        },
        include: {
          tags: true,
        },
      });
      expect(inflow).toEqual(outflowMock);
    });

    it('should throw an error if type is not recognized', async () => {
      expect.assertions(2);

      try {
        await sut.create({ ...createOutflowData, type: 'type' as any });
      } catch (e) {
        expect(prismaService.cashflow.create).toHaveBeenCalledTimes(0);
        expect(e).toBeDefined();
      }
    });
  });
});
