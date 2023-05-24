import { CashflowTag } from './cashflow-tag';
import { CashflowTagQueryType } from './cashflow-tag.types';

export abstract class CashflowTagRepository {
  public abstract findMany(query: CashflowTagQueryType): Promise<CashflowTag[]>;

  public abstract findById(id: string): Promise<CashflowTag | null>;

  public abstract delete(id: string): Promise<CashflowTag>;
}
