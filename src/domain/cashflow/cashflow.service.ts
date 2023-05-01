import { Cashflow } from './cashflow';
import { CreateCashflowType } from './cashflow.types';

export abstract class CashflowService {
  public abstract create(data: CreateCashflowType): Promise<Cashflow>;

  public abstract findMany(search: any): Promise<Cashflow[]>;

  public abstract findById(id: string): Promise<Cashflow>;

  public abstract delete(id: string): Promise<Cashflow>;
}
