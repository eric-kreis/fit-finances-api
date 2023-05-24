import { CashflowType } from './cashflow-type.enum';

export abstract class Cashflow {
  public readonly id: string;

  public readonly createdAt: Date;

  public readonly amount: number;

  public readonly effectiveDate: Date;

  public readonly description: string | null;

  public abstract readonly type: CashflowType;

  public readonly tags: string[];

  constructor(cashflow: Cashflow) {
    this.id = cashflow.id;
    this.createdAt = cashflow.createdAt;
    this.amount = cashflow.amount;
    this.effectiveDate = cashflow.effectiveDate;
    this.description = cashflow.description;
  }
}
