import { Cashflow } from './cashflow';
import { CashflowPaginationType, CreateCashflowType } from './cashflow.types';

export abstract class CashflowService {
  public abstract create(data: CreateCashflowType): Promise<Cashflow>;

  public abstract findMany(query: CashflowPaginationType): Promise<Cashflow[]>;

  public abstract findById(id: string): Promise<Cashflow>;

  public abstract delete(id: string): Promise<Cashflow>;
}
