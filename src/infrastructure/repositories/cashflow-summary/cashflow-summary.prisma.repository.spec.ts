import { DeepMockProxy } from 'jest-mock-extended';
import { Test, TestingModule } from '@nestjs/testing';
import { prismaMock } from '@mocks/prisma/singleton';
import {
  annualCashflowSummariesMock,
  monthlyCashflowSummariesMock,
  monthlyCashflowSummaryMock,
  prismaAnnualCashflowSummariesMock,
  prismaMonthlyCashflowSummariesMock,
  prismaMonthlyCashflowSummaryMock,
} from '@mocks/cashflow-summary.mock';
import { inflowMock, outflowMock } from '@mocks/cashflow.mock';
import { CashflowSummary } from '@domain/cashflow-summary/cashflow-summary';
import { PrismaService } from '../../prisma.service';
import { CashflowSummaryPrismaRepository } from './cashflow-summary.prisma.repository';

describe('MemberPrismaRepository', () => {
  let sut: CashflowSummaryPrismaRepository;
  let prismaService: DeepMockProxy<PrismaService>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CashflowSummaryPrismaRepository,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    sut = module.get<CashflowSummaryPrismaRepository>(CashflowSummaryPrismaRepository);
    prismaService = module.get<DeepMockProxy<PrismaService>>(PrismaService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(sut.findOneSummary).toBeDefined();
    expect(sut.getAnnualSummaries).toBeDefined();
    expect(sut.getAnnualSummaries).toBeDefined();
    expect(sut.updateSummaryOnCreation).toBeDefined();
    expect(sut.updateSummaryOnDeletion).toBeDefined();
  });

  describe('findOneSummary()', () => {
    it('should return a cashflow monthly summary', async () => {
      prismaService.monthlyCashflowSummary.findUnique.mockResolvedValue(
        prismaMonthlyCashflowSummaryMock,
      );

      expect.assertions(4);

      const monthlySummary = await sut.findOneSummary(
        monthlyCashflowSummaryMock.month as number,
        monthlyCashflowSummaryMock.year,
      );

      expect(prismaService.monthlyCashflowSummary.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaService.monthlyCashflowSummary.findUnique).toHaveBeenCalledWith({
        where: {
          monthYear: {
            month: monthlyCashflowSummaryMock.month,
            year: monthlyCashflowSummaryMock.year,
          },
        },
      });
      expect(monthlySummary).toEqual(monthlyCashflowSummaryMock);
      expect(monthlySummary).toBeInstanceOf(CashflowSummary);
    });

    it('should return null', async () => {
      prismaService.monthlyCashflowSummary.findUnique.mockResolvedValue(null);

      expect.assertions(3);

      const monthlySummary = await sut.findOneSummary(
        monthlyCashflowSummaryMock.month as number,
        monthlyCashflowSummaryMock.year,
      );

      expect(prismaService.monthlyCashflowSummary.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaService.monthlyCashflowSummary.findUnique).toHaveBeenCalledWith({
        where: {
          monthYear: {
            month: monthlyCashflowSummaryMock.month,
            year: monthlyCashflowSummaryMock.year,
          },
        },
      });
      expect(monthlySummary).toBeNull();
    });
  });

  describe('getMonthlySummaries()', () => {
    it('should return the cashflow summaries grouped by month', async () => {
      prismaService.monthlyCashflowSummary.findMany.mockResolvedValue(
        prismaMonthlyCashflowSummariesMock,
      );

      expect.assertions(3);

      const monthlySummaries = await sut.getMonthlySummaries(
        monthlyCashflowSummaryMock.year,
      );

      expect(prismaService.monthlyCashflowSummary.findMany).toHaveBeenCalledTimes(1);
      expect(monthlySummaries).toEqual(monthlyCashflowSummariesMock);
      expect(monthlySummaries[0]).toBeInstanceOf(CashflowSummary);
    });
  });

  describe('getAnnualSummaries()', () => {
    it('should return the cashflow summaries grouped by year', async () => {
      prismaService.monthlyCashflowSummary.groupBy.mockResolvedValue(
        prismaAnnualCashflowSummariesMock as any,
      );

      expect.assertions(3);

      const annualSummaries = await sut.getAnnualSummaries();

      expect(prismaService.monthlyCashflowSummary.groupBy).toHaveBeenCalledTimes(1);
      expect(annualSummaries).toEqual(annualCashflowSummariesMock);
      expect(annualSummaries[0]).toBeInstanceOf(CashflowSummary);
    });
  });

  describe('updateSummaryOnCreation()', () => {
    it('should return the monthly cashflow summary updated when an inflow is created', async () => {
      prismaService.monthlyCashflowSummary.upsert.mockResolvedValue(
        prismaMonthlyCashflowSummaryMock,
      );

      expect.assertions(4);

      const updatedMonthlySummary = await sut.updateSummaryOnCreation(inflowMock);
      const expectedMonth = inflowMock.effectiveDate.getMonth() + 1;
      const expectedYear = inflowMock.effectiveDate.getFullYear();

      expect(prismaService.monthlyCashflowSummary.upsert).toHaveBeenCalledTimes(1);
      expect(prismaService.monthlyCashflowSummary.upsert).toHaveBeenCalledWith({
        where: { monthYear: { month: expectedMonth, year: expectedYear } },
        create: {
          month: expectedMonth,
          year: expectedYear,
          inflows: inflowMock.amount,
          netCashflow: inflowMock.amount,
        },
        update: {
          inflows: { increment: inflowMock.amount },
          netCashflow: { increment: inflowMock.amount },
        },
      });
      expect(updatedMonthlySummary).toEqual(monthlyCashflowSummaryMock);
      expect(updatedMonthlySummary).toBeInstanceOf(CashflowSummary);
    });

    it('should return the cashflow summary updated when an outflow is created', async () => {
      prismaService.monthlyCashflowSummary.upsert.mockResolvedValue(
        prismaMonthlyCashflowSummaryMock,
      );

      expect.assertions(4);

      const updatedMonthlySummary = await sut.updateSummaryOnCreation(outflowMock);
      const expectedMonth = outflowMock.effectiveDate.getMonth() + 1;
      const expectedYear = outflowMock.effectiveDate.getFullYear();

      expect(prismaService.monthlyCashflowSummary.upsert).toHaveBeenCalledTimes(1);
      expect(prismaService.monthlyCashflowSummary.upsert).toHaveBeenCalledWith({
        where: { monthYear: { month: expectedMonth, year: expectedYear } },
        create: {
          month: expectedMonth,
          year: expectedYear,
          outflows: outflowMock.amount,
          netCashflow: -outflowMock.amount,
        },
        update: {
          outflows: { increment: outflowMock.amount },
          netCashflow: { decrement: outflowMock.amount },
        },
      });
      expect(updatedMonthlySummary).toEqual(monthlyCashflowSummaryMock);
      expect(updatedMonthlySummary).toBeInstanceOf(CashflowSummary);
    });
  });

  describe('updateSummaryOnDeletion()', () => {
    it('should return the monthly cashflow summary updated when an inflow is deleted', async () => {
      prismaService.monthlyCashflowSummary.update.mockResolvedValue(
        prismaMonthlyCashflowSummaryMock,
      );

      expect.assertions(4);

      const updatedMonthlySummary = await sut.updateSummaryOnDeletion(inflowMock);
      const expectedMonth = inflowMock.effectiveDate.getMonth() + 1;
      const expectedYear = inflowMock.effectiveDate.getFullYear();

      expect(prismaService.monthlyCashflowSummary.update).toHaveBeenCalledTimes(1);
      expect(prismaService.monthlyCashflowSummary.update).toHaveBeenCalledWith({
        where: { monthYear: { month: expectedMonth, year: expectedYear } },
        data: {
          inflows: { decrement: inflowMock.amount },
          netCashflow: { decrement: inflowMock.amount },
        },
      });
      expect(updatedMonthlySummary).toEqual(monthlyCashflowSummaryMock);
      expect(updatedMonthlySummary).toBeInstanceOf(CashflowSummary);
    });

    it('should return the monthly cashflow summary updated when an outflow is deleted', async () => {
      prismaService.monthlyCashflowSummary.update.mockResolvedValue(
        prismaMonthlyCashflowSummaryMock,
      );

      expect.assertions(4);

      const updatedMonthlySummary = await sut.updateSummaryOnDeletion(outflowMock);
      const expectedMonth = outflowMock.effectiveDate.getMonth() + 1;
      const expectedYear = outflowMock.effectiveDate.getFullYear();

      expect(prismaService.monthlyCashflowSummary.update).toHaveBeenCalledTimes(1);
      expect(prismaService.monthlyCashflowSummary.update).toHaveBeenCalledWith({
        where: { monthYear: { month: expectedMonth, year: expectedYear } },
        data: {
          outflows: { decrement: outflowMock.amount },
          netCashflow: { increment: outflowMock.amount },
        },
      });
      expect(updatedMonthlySummary).toEqual(monthlyCashflowSummaryMock);
      expect(updatedMonthlySummary).toBeInstanceOf(CashflowSummary);
    });
  });
});
