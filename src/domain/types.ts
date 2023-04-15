import { DomainSortOrder } from './enums';

export type PaginationType<TDomain> = {
  page?: number;
  limit?: number;
  sort?: DomainSortOrder;
  orderBy?: keyof TDomain;
};
