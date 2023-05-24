import { Cashflow } from './cashflow';
import { CashflowType } from './cashflow-type.enum';

export class Inflow extends Cashflow {
  public readonly type = CashflowType.INFLOW;
}
