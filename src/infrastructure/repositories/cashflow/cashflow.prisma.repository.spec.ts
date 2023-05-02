import { DeepMockProxy } from 'jest-mock-extended';
import { Test, TestingModule } from '@nestjs/testing';
import { CashflowType } from '@domain/cashflow/cashflow-type.enum';
import { CreateCashflowType } from '@domain/cashflow/cashflow.types';
import { DomainSortOrder } from '@domain/enums';
import { prismaMock } from '@mocks/prisma/singleton';
import {
  cashflowsMock,
  inflowMock,
  outflowMock,
  prismaCashflowsMock,
  prismaInflowMock,
  prismaOutflowMock,
} from '@mocks/cashflow.mock';
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
      prismaService.cashflow.create.mockResolvedValue(prismaOutflowMock);

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
  });

  describe('findMany()', () => {
    it('should return cashflows', async () => {
      prismaService.cashflow.findMany.mockResolvedValue(prismaCashflowsMock);

      expect.assertions(2);

      const cashflows = await sut.findMany({
        page: 0,
        limit: 10,
        orderBy: 'effectiveDate',
        sort: DomainSortOrder.asc,
        search: 'Venda',
        type: CashflowType.INFLOW,
      });

      expect(prismaService.cashflow.findMany).toHaveBeenCalledTimes(1);
      expect(cashflows).toEqual(cashflowsMock);
    });
  });

  describe('findById()', () => {
    it('should return a cashflow', async () => {
      prismaService.cashflow.findUnique.mockResolvedValue(prismaInflowMock);

      expect.assertions(3);

      const inflow = await sut.findById(inflowMock.id);

      expect(prismaService.cashflow.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaService.cashflow.findUnique).toHaveBeenCalledWith({
        where: { id: inflowMock.id },
        include: {
          tags: true,
        },
      });
      expect(inflow).toEqual(inflowMock);
    });

    it('should return null', async () => {
      prismaService.cashflow.findUnique.mockResolvedValue(null);

      expect.assertions(3);

      const inflow = await sut.findById(inflowMock.id);

      expect(prismaService.cashflow.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaService.cashflow.findUnique).toHaveBeenCalledWith({
        where: { id: inflowMock.id },
        include: {
          tags: true,
        },
      });
      expect(inflow).toEqual(null);
    });
  });

  describe('delete()', () => {
    it('should return the deleted cashflow', async () => {
      prismaService.cashflow.delete.mockResolvedValue(prismaOutflowMock);

      expect.assertions(3);

      const inflow = await sut.delete(outflowMock.id);

      expect(prismaService.cashflow.delete).toHaveBeenCalledTimes(1);
      expect(prismaService.cashflow.delete).toHaveBeenCalledWith({
        where: { id: outflowMock.id },
        include: {
          tags: true,
        },
      });
      expect(inflow).toEqual(outflowMock);
    });
  });
});
