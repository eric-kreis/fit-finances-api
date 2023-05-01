import { Cashflow } from './cashflow';
import { CashflowType } from './cashflow-type.enum';

export class Inflow extends Cashflow {
  declare public readonly type: CashflowType.INFLOW;

  constructor(inflow: Omit<Inflow, 'type'>) {
    super({
      ...inflow,
      type: CashflowType.INFLOW,
    });
  }
}