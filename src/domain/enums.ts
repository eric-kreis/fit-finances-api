export enum DomainErrorCode {
  // Manager (domain 1) exceptions
  ManagerUnauthorized = 1401,
  ManagerForbidden = 1403,
  ManagerNotFound = 1404,
  ManagerAlreadyRegistred = 1409,

  // Member (domain 2) exceptions
  MemberNotFound = 2404,
  MemberAlreadyRegistred = 2409,

  // Cashflow (domain 3) exceptions
  CashflowNotFound = 3404,

  // CashflowSummary (domain 4) exceptions
  CashflowSummaryNotFound = 4404,
}

export enum DomainSortOrder {
  asc = 'asc',
  desc = 'desc',
}
