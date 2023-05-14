import { CashflowSummary } from '@domain/cashflow-summary/cashflow-summary';
import { faker } from '@faker-js/faker';
import { MonthlyCashflowSummary as PrismaMonthlyCashflowSummary } from '@prisma/client';

export const prismaMonthlyCashflowSummaryMock: PrismaMonthlyCashflowSummary = {
  id: faker.database.mongodbObjectId(),
  createdAt: new Date(),
  updatedAt: new Date(),
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
  inflows: faker.datatype.float(),
  outflows: faker.datatype.float(),
  netCashflow: faker.datatype.float(),
};

export const prismaAnnualCashflowSummaryMock = {
  _sum: {
    inflows: faker.datatype.float(),
    outflows: faker.datatype.float(),
    netCashflow: faker.datatype.float(),
  },
  year: new Date().getFullYear(),
};

export const prismaMonthlyCashflowSummariesMock: PrismaMonthlyCashflowSummary[] = [
  prismaMonthlyCashflowSummaryMock,
];

export const prismaAnnualCashflowSummariesMock = [
  prismaAnnualCashflowSummaryMock,
];

export const monthlyCashflowSummaryMock = new CashflowSummary({
  month: prismaMonthlyCashflowSummaryMock.month,
  year: prismaMonthlyCashflowSummaryMock.year,
  inflows: prismaMonthlyCashflowSummaryMock.inflows,
  outflows: prismaMonthlyCashflowSummaryMock.outflows,
  netCashflow: prismaMonthlyCashflowSummaryMock.netCashflow,
});

export const annualCashflowSummaryMock = new CashflowSummary({
  year: prismaAnnualCashflowSummaryMock.year,
  inflows: prismaAnnualCashflowSummaryMock._sum.inflows,
  outflows: prismaAnnualCashflowSummaryMock._sum.outflows,
  netCashflow: prismaAnnualCashflowSummaryMock._sum.netCashflow,
});

export const monthlyCashflowSummariesMock: CashflowSummary[] = [
  monthlyCashflowSummaryMock,
];

export const annualCashflowSummariesMock: CashflowSummary[] = [
  annualCashflowSummaryMock,
];
