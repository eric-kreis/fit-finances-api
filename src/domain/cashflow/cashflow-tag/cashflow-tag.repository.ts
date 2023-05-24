import { CashflowTag } from './cashflow-tag';

export abstract class CashflowTagRepository {
  public abstract findMany(search: string): Promise<CashflowTag[]>;

  public abstract findById(id: string): Promise<CashflowTag | null>;

  public abstract delete(id: string): Promise<CashflowTag>;
}
