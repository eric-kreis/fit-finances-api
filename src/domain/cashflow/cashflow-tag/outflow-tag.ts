import { CashflowType } from '../cashflow-type.enum';
import { CashflowTag } from './cashflow-tag';

export class OutflowTag extends CashflowTag {
  public readonly type = CashflowType.OUTFLOW;
}
