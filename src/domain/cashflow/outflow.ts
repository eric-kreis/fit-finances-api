import { Cashflow } from './cashflow';
import { CashflowType } from './cashflow-type.enum';

export class Outflow extends Cashflow {
  declare public readonly type: CashflowType.OUTFLOW;

  constructor(outflow: Omit<Outflow, 'type'>) {
    super({
      ...outflow,
      type: CashflowType.OUTFLOW,
    });
  }
}
