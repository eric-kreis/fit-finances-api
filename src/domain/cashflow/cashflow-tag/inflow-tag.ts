import { CashflowType } from '../cashflow-type.enum';
import { CashflowTag } from './cashflow-tag';

export class InflowTag extends CashflowTag {
  public readonly type = CashflowType.INFLOW;
}
