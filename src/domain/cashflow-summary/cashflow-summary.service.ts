import { Cashflow } from '@domain/cashflow/cashflow';
import { CashflowSummary } from './cashflow-summary';
import { UpdateSummaryOperation } from './cashflow-summary.types';

export abstract class CashflowSummaryService {
  public abstract getMonthlySummaries(year: number): Promise<CashflowSummary[]>;

  public abstract getAnnualSummaries(): Promise<CashflowSummary[]>;

  public abstract updateSummary(
    cashflow: Cashflow,
    operation: UpdateSummaryOperation,
  ): Promise<CashflowSummary>;
}
