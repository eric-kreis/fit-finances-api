import { Cashflow } from './cashflow';
import { CashflowType } from './cashflow-type.enum';
import { Inflow } from './inflow';
import { Outflow } from './outflow';

export class CashflowFactory {
  public static create(cashflow: Cashflow): Cashflow {
    switch (cashflow.type) {
    case CashflowType.INFLOW:
      return new Inflow(cashflow);
    case CashflowType.OUTFLOW:
      return new Outflow(cashflow);
    default:
      throw new Error('Invalid cashflow type');
    }
  }
}
