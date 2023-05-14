import { PaginationType } from '@domain/types';
import { Cashflow } from './cashflow';
import { CashflowType } from './cashflow-type.enum';

export type CreateCashflowType = { description?: string | null } & (
  Omit<Cashflow, 'id' | 'createdAt' | 'description'>
);

export type CashflowPaginationType = PaginationType<Cashflow> & {
  search?: string;
  type?: CashflowType;
};
