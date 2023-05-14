import { CashflowSummary } from '@domain/cashflow-summary/cashflow-summary';
import { CashflowSummaryRepository } from '@domain/cashflow-summary/cashflow-summary.repositoy';
import { CashflowSummaryService as DomainCashflowSummaryService } from '@domain/cashflow-summary/cashflow-summary.service';
import { UpdateSummaryOperation } from '@domain/cashflow-summary/cashflow-summary.types';
import { CashflowSummaryNotFoundException } from '@domain/cashflow-summary/exceptions/cashflow-summary-not-found.exception';
import { Cashflow } from '@domain/cashflow/cashflow';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CashflowSummaryService extends DomainCashflowSummaryService {
  constructor(private readonly _cashflowSummaryRepository: CashflowSummaryRepository) {
    super();
  }

  public async getMonthlySummaries(year: number): Promise<CashflowSummary[]> {
    return this._cashflowSummaryRepository.getMonthlySummaries(year);
  }

  public async getAnnualSummaries(): Promise<CashflowSummary[]> {
    return this._cashflowSummaryRepository.getAnnualSummaries();
  }

  public async updateSummary(
    cashflow: Cashflow,
    operation: UpdateSummaryOperation,
  ): Promise<CashflowSummary> {
    if (operation === 'deletion') {
      const month = cashflow.effectiveDate.getMonth() + 1;
      const yaer = cashflow.effectiveDate.getFullYear();
      const summary = await this._cashflowSummaryRepository.findOneSummary(month, yaer);
      if (!summary) throw new CashflowSummaryNotFoundException();
      return this._cashflowSummaryRepository.updateSummaryOnDeletion(cashflow);
    }
    return this._cashflowSummaryRepository.updateSummaryOnCreation(cashflow);
  }
}
