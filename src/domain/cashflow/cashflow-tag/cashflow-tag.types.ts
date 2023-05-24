import { CashflowType } from '../cashflow-type.enum';

export type CashflowTagQueryType = {
  search?: string;
  type?: CashflowType;
};
