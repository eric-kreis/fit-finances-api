import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';
import { CashflowSummaryRepository } from '@domain/cashflow-summary/cashflow-summary.repositoy';
import { CashflowSummaryNotFoundException } from '@domain/cashflow-summary/exceptions/cashflow-summary-not-found.exception';
import {
  annualCashflowSummariesMock,
  monthlyCashflowSummariesMock,
  monthlyCashflowSummaryMock,
} from '@mocks/cashflow-summary.mock';
import { inflowMock } from '@mocks/cashflow.mock';
import { CashflowSummaryService } from './cashflow-summary.service';

const cashflowSummaryRepositoryMock = mockDeep<CashflowSummaryRepository>();

describe('CashflowSummaryService', () => {
  let sut: CashflowSummaryService;
  let cashflowSummaryRepository: DeepMockProxy<CashflowSummaryRepository>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CashflowSummaryService,
        {
          provide: CashflowSummaryRepository,
          useValue: cashflowSummaryRepositoryMock,
        },
      ],
    }).compile();

    sut = module.get<CashflowSummaryService>(CashflowSummaryService);
    cashflowSummaryRepository = module.get<DeepMockProxy<CashflowSummaryRepository>>(
      CashflowSummaryRepository,
    );
  });

  beforeEach(() => {
    mockReset(cashflowSummaryRepository);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(sut.getMonthlySummaries).toBeDefined();
    expect(sut.getAnnualSummaries).toBeDefined();
    expect(sut.updateSummary).toBeDefined();
  });

  describe('getMonthlySummaries()', () => {
    it('should return monthly summaries', async () => {
      cashflowSummaryRepository.getMonthlySummaries.mockResolvedValue(monthlyCashflowSummariesMock);

      expect.assertions(2);

      const monthlySummaries = await sut.getMonthlySummaries(monthlyCashflowSummaryMock.year);

      expect(cashflowSummaryRepository.getMonthlySummaries).toHaveBeenCalledTimes(1);
      expect(monthlySummaries).toEqual(monthlyCashflowSummariesMock);
    });
  });

  describe('getAnnualSummaries()', () => {
    it('should return annual summaries', async () => {
      cashflowSummaryRepository.getAnnualSummaries.mockResolvedValue(annualCashflowSummariesMock);

      expect.assertions(2);

      const anualSummaries = await sut.getAnnualSummaries();

      expect(cashflowSummaryRepository.getAnnualSummaries).toHaveBeenCalledTimes(1);
      expect(anualSummaries).toEqual(annualCashflowSummariesMock);
    });
  });

  describe('updateSummary()', () => {
    it('should return the updated summary when a cashflow is created', async () => {
      cashflowSummaryRepository.updateSummaryOnCreation.mockResolvedValue(
        monthlyCashflowSummaryMock,
      );

      expect.assertions(3);

      const summary = await sut.updateSummary(inflowMock, 'creation');

      expect(cashflowSummaryRepository.findOneSummary).toHaveBeenCalledTimes(0);
      expect(cashflowSummaryRepository.updateSummaryOnCreation).toHaveBeenCalledTimes(1);
      expect(summary).toEqual(monthlyCashflowSummaryMock);
    });

    it('should return the updated summary when a cashflow is deleted', async () => {
      cashflowSummaryRepository.findOneSummary.mockResolvedValue(
        monthlyCashflowSummaryMock,
      );
      cashflowSummaryRepository.updateSummaryOnDeletion.mockResolvedValue(
        monthlyCashflowSummaryMock,
      );

      expect.assertions(3);

      const summary = await sut.updateSummary(inflowMock, 'deletion');

      expect(cashflowSummaryRepository.findOneSummary).toHaveBeenCalledTimes(1);
      expect(cashflowSummaryRepository.updateSummaryOnDeletion).toHaveBeenCalledTimes(1);
      expect(summary).toEqual(monthlyCashflowSummaryMock);
    });

    it('should throw a not found exception when a not found summary tries to be updated on deletion', async () => {
      cashflowSummaryRepository.findOneSummary.mockResolvedValue(null);
      cashflowSummaryRepository.updateSummaryOnDeletion.mockResolvedValue(
        monthlyCashflowSummaryMock,
      );

      expect.assertions(3);

      try {
        await sut.updateSummary(inflowMock, 'deletion');
      } catch (e) {
        expect(cashflowSummaryRepository.findOneSummary).toHaveBeenCalledTimes(1);
        expect(cashflowSummaryRepository.updateSummaryOnDeletion).toHaveBeenCalledTimes(0);
        expect(e).toBeInstanceOf(CashflowSummaryNotFoundException);
      }
    });
  });
});
