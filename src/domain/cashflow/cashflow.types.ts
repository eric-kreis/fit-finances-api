import { Cashflow } from '@prisma/client';

export type CreateCashflowType = Omit<Cashflow, 'id' | 'createdAt'> & { description?: string | null };
