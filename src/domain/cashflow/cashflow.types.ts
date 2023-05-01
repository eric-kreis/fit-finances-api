import { Cashflow } from './cashflow';

export type CreateCashflowType = Omit<Cashflow, 'id' | 'createdAt'> & { description?: string | null };
