import { CashflowTag } from './cashflow-tag';
import { CashflowTagQueryType } from './cashflow-tag.types';

export abstract class CashflowTagService {
  public abstract findMany(query: CashflowTagQueryType): Promise<CashflowTag[]>;

  public abstract delete(id: string): Promise<CashflowTag>;
}
