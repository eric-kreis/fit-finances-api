import { CashflowType } from '../cashflow-type.enum';
import { CashflowTag } from './cashflow-tag';
import { InflowTag } from './inflow-tag';
import { OutflowTag } from './outflow-tag';

export class CashflowTagFactory {
  public static create(cashflowTag: CashflowTag): CashflowTag {
    switch (cashflowTag.type) {
    case CashflowType.INFLOW:
      return new InflowTag(cashflowTag);
    case CashflowType.OUTFLOW:
      return new OutflowTag(cashflowTag);
    default:
      throw new Error('Invalid cashflow type');
    }
  }
}
