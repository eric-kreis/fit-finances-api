import { PaginationType } from '@domain/types';
import { Cashflow } from './cashflow';
import { CashflowType } from './cashflow-type.enum';

export type CreateCashflowType = Omit<Cashflow, 'id' | 'createdAt'> & { description?: string | null };

export type CashflowPaginationType = PaginationType<Cashflow> & {
  search?: string;
  type?: CashflowType;
};
