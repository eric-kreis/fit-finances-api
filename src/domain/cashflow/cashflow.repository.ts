import { Cashflow } from './cashflow';
import { CashflowPaginationType, CreateCashflowType } from './cashflow.types';

export abstract class CashflowRepository {
  public abstract create(data: CreateCashflowType): Promise<Cashflow>;

  public abstract findMany(query: CashflowPaginationType): Promise<Cashflow[]>;

  public abstract findById(id: string): Promise<Cashflow | null>;

  public abstract delete(id: string): Promise<Cashflow>;
}
