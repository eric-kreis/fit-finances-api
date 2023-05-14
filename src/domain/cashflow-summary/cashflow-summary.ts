export class CashflowSummary {
  public readonly year: number;

  public readonly month?: number;

  public readonly inflows: number;

  public readonly outflows: number;

  public readonly netCashflow: number;

  constructor(cashflowSummary: Omit<CashflowSummary, 'fullDate'>) {
    this.year = cashflowSummary.year;
    this.month = cashflowSummary.month;
    this.inflows = cashflowSummary.inflows;
    this.outflows = cashflowSummary.outflows;
    this.netCashflow = cashflowSummary.netCashflow;
  }

  public get fullDate(): string {
    if (this.month !== undefined) return `${this.month}/${this.year}`;
    return this.year.toString();
  }
}
