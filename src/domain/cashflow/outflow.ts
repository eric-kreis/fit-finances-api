import { Cashflow } from './cashflow';
import { CashflowType } from './cashflow-type.enum';

export class Outflow extends Cashflow {
  public readonly type = CashflowType.OUTFLOW;
}
