import { CashflowTag } from './cashflow-tag';

export abstract class CashflowTagService {
  public abstract findMany(search: string): Promise<CashflowTag[]>;

  public abstract delete(id: string): Promise<CashflowTag>;
}
