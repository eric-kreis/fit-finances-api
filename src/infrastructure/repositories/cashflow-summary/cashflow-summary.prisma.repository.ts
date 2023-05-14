import { CashflowSummary } from '@domain/cashflow-summary/cashflow-summary';
import { CashflowSummaryRepository } from '@domain/cashflow-summary/cashflow-summary.repositoy';
import { Cashflow } from '@domain/cashflow/cashflow';
import { CashflowType } from '@domain/cashflow/cashflow-type.enum';
import { PrismaService } from '@infrastructure/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class CashflowSummaryPrismaRepository extends CashflowSummaryRepository {
  constructor(private readonly _prismaService: PrismaService) {
    super();
  }

  public async findOneSummary(month: number, year: number): Promise<CashflowSummary | null> {
    const summary = await this._prismaService.monthlyCashflowSummary.findUnique({
      where: { monthYear: { month, year } },
    });
    if (!summary) return null;
    return new CashflowSummary(summary);
  }

  public async getMonthlySummaries(year: number): Promise<CashflowSummary[]> {
    const cashflowSummaries = await this._prismaService.monthlyCashflowSummary.findMany({
      where: { year },
    });
    return cashflowSummaries.map((cashflowSummary) => new CashflowSummary(cashflowSummary));
  }

  public async getAnnualSummaries(): Promise<CashflowSummary[]> {
    const cashflowSummaries = await this._prismaService.monthlyCashflowSummary.groupBy({
      by: ['year'],
      _sum: { inflows: true, outflows: true, netCashflow: true },
    });

    return cashflowSummaries.map(({
      year,
      _sum: { inflows, outflows, netCashflow },
    }) => new CashflowSummary({
      year,
      inflows: inflows as number,
      outflows: outflows as number,
      netCashflow: netCashflow as number,
    }));
  }

  public async updateSummaryOnCreation(cashflow: Cashflow): Promise<CashflowSummary> {
    const month = cashflow.effectiveDate.getMonth() + 1;
    const year = cashflow.effectiveDate.getFullYear();

    const create: Prisma.MonthlyCashflowSummaryCreateInput = { month, year };
    const update: Prisma.MonthlyCashflowSummaryUpdateInput = {};

    if (cashflow.type === CashflowType.INFLOW) {
      create.inflows = cashflow.amount;
      create.netCashflow = cashflow.amount;
      update.inflows = { increment: cashflow.amount };
      update.netCashflow = { increment: cashflow.amount };
    } else {
      create.outflows = cashflow.amount;
      create.netCashflow = -cashflow.amount;
      update.outflows = { increment: cashflow.amount };
      update.netCashflow = { decrement: cashflow.amount };
    }

    const updatedSummary = await this._prismaService.monthlyCashflowSummary.upsert({
      where: { monthYear: { month, year } },
      create,
      update,
    });

    return new CashflowSummary(updatedSummary);
  }

  public async updateSummaryOnDeletion(cashflow: Cashflow): Promise<CashflowSummary> {
    const month = cashflow.effectiveDate.getMonth() + 1;
    const year = cashflow.effectiveDate.getFullYear();

    const update: Prisma.MonthlyCashflowSummaryUpdateInput = {};

    if (cashflow.type === CashflowType.INFLOW) {
      update.inflows = { decrement: cashflow.amount };
      update.netCashflow = { decrement: cashflow.amount };
    } else {
      update.outflows = { decrement: cashflow.amount };
      update.netCashflow = { increment: cashflow.amount };
    }

    const updatedSummary = await this._prismaService.monthlyCashflowSummary.update({
      where: { monthYear: { month, year } },
      data: update,
    });

    return new CashflowSummary(updatedSummary);
  }
}
