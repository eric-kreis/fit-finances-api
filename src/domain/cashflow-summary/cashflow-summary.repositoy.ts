import { Cashflow } from '@domain/cashflow/cashflow';
import { CashflowSummary } from './cashflow-summary';

export abstract class CashflowSummaryRepository {
  public abstract findOneSummary(month: number, year: number): Promise<CashflowSummary | null>;

  public abstract getMonthlySummaries(year: number): Promise<CashflowSummary[]>;

  public abstract getAnnualSummaries(): Promise<CashflowSummary[]>;

  public abstract updateSummaryOnCreation(cashflow: Cashflow): Promise<CashflowSummary>;

  public abstract updateSummaryOnDeletion(cashflow: Cashflow): Promise<CashflowSummary>;
}
