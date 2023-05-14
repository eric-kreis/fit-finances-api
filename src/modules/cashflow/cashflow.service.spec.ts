import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';
import { Test, TestingModule } from '@nestjs/testing';
import { CashflowRepository } from '@domain/cashflow/cashflow.repository';
import { cashflowsMock, inflowMock } from '@mocks/cashflow.mock';
import { DomainSortOrder } from '@domain/enums';
import { CashNotFoundException } from '@domain/cashflow/exceptions/cashflow-not-found.exception';
import { CashflowService } from './cashflow.service';

const cashflowRepositoryMock = mockDeep<CashflowRepository>();

describe('CashflowService', () => {
  let sut: CashflowService;
  let cashflowRepository: DeepMockProxy<CashflowRepository>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CashflowService,
        {
          provide: CashflowRepository,
          useValue: cashflowRepositoryMock,
        },
      ],
    }).compile();

    sut = module.get<CashflowService>(CashflowService);
    cashflowRepository = module.get<DeepMockProxy<CashflowRepository>>(CashflowRepository);
  });

  beforeEach(() => {
    mockReset(cashflowRepository);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(sut.create).toBeDefined();
    expect(sut.findMany).toBeDefined();
    expect(sut.findById).toBeDefined();
    expect(sut.delete).toBeDefined();
  });

  describe('create()', () => {
    it('should return a new cashflow', async () => {
      cashflowRepository.create.mockResolvedValue(inflowMock);

      expect.assertions(2);

      const cashflow = await sut.create({
        amount: inflowMock.amount,
        description: inflowMock.description,
        effectiveDate: inflowMock.effectiveDate,
        tags: inflowMock.tags,
        type: inflowMock.type,
      });

      expect(cashflowRepository.create).toHaveBeenCalledTimes(1);
      expect(cashflow).toEqual(inflowMock);
    });
  });

  describe('findMany()', () => {
    it('should return cashflows', async () => {
      cashflowRepository.findMany.mockResolvedValue(cashflowsMock);

      expect.assertions(2);

      const cashflow = await sut.findMany({
        limit: 10,
        page: 0,
        sort: DomainSortOrder.asc,
        orderBy: 'createdAt',
      });

      expect(cashflowRepository.findMany).toHaveBeenCalledTimes(1);
      expect(cashflow).toEqual(cashflowsMock);
    });
  });

  describe('findById()', () => {
    it('should return a cashflow', async () => {
      cashflowRepository.findById.mockResolvedValue(inflowMock);

      expect.assertions(2);

      const cashflow = await sut.findById(inflowMock.id);

      expect(cashflowRepository.findById).toHaveBeenCalledTimes(1);
      expect(cashflow).toEqual(inflowMock);
    });

    it('should throw a cashflow not found exception', async () => {
      cashflowRepository.findById.mockResolvedValue(null);

      expect.assertions(2);

      try {
        await sut.findById(inflowMock.id);
      } catch (e) {
        expect(cashflowRepository.findById).toHaveBeenCalledTimes(1);
        expect(e).toBeInstanceOf(CashNotFoundException);
      }
    });
  });

  describe('delete()', () => {
    it('should return a cashflow', async () => {
      cashflowRepository.findById.mockResolvedValue(inflowMock);
      cashflowRepository.delete.mockResolvedValue(inflowMock);

      expect.assertions(3);

      const cashflow = await sut.delete(inflowMock.id);

      expect(cashflowRepository.findById).toHaveBeenCalledTimes(1);
      expect(cashflowRepository.delete).toHaveBeenCalledTimes(1);
      expect(cashflow).toEqual(inflowMock);
    });

    it('should throw a cashflow not found exception', async () => {
      cashflowRepository.findById.mockResolvedValue(null);

      expect.assertions(3);

      try {
        await sut.delete(inflowMock.id);
      } catch (e) {
        expect(cashflowRepository.findById).toHaveBeenCalledTimes(1);
        expect(cashflowRepository.delete).toHaveBeenCalledTimes(0);
        expect(e).toBeInstanceOf(CashNotFoundException);
      }
    });
  });
});
