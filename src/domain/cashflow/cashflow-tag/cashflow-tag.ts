import { CashflowType } from '../cashflow-type.enum';

export abstract class CashflowTag {
  public readonly id: string;

  public readonly name: string;

  public abstract readonly type: CashflowType;

  constructor(cashflowTag: CashflowTag) {
    this.id = cashflowTag.id;
    this.name = cashflowTag.name;
  }
}
