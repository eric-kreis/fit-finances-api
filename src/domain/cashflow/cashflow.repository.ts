import { Cashflow } from './cashflow';
import { CreateCashflowType } from './cashflow.types';

export abstract class CashflowRepository {
  public abstract create(data: CreateCashflowType): Promise<Cashflow>;

  public abstract findMany(search: any): Promise<Cashflow[]>;

  public abstract findById(id: string): Promise<Cashflow | null>;

  public abstract delete(id: string): Promise<Cashflow>;
}
