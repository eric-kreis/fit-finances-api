import { Cashflow } from '@domain/cashflow/cashflow';
import { CashflowTag, Cashflow as PrismaCashflow } from '@prisma/client';
import { CashflowType } from '@domain/cashflow/cashflow-type.enum';
import { Inflow } from '@domain/cashflow/inflow';
import { Outflow } from '@domain/cashflow/outflow';
import { faker } from '@faker-js/faker';

const prismaInflowTagMock: CashflowTag = {
  id: faker.database.mongodbObjectId(),
  name: faker.lorem.slug(),
  cashflowsIDs: [],
  type: CashflowType.INFLOW,
};

const prismaOutflowTagMock: CashflowTag = {
  id: faker.database.mongodbObjectId(),
  name: faker.lorem.slug(),
  cashflowsIDs: [],
  type: CashflowType.OUTFLOW,
};

export const prismaInflowMock: PrismaCashflow & { tags: CashflowTag[] } = {
  id: faker.database.mongodbObjectId(),
  createdAt: new Date(),
  effectiveDate: new Date(),
  amount: +faker.commerce.price(),
  description: faker.lorem.paragraph(),
  tagsIDs: [prismaInflowTagMock.id],
  tags: [prismaInflowTagMock],
  type: CashflowType.INFLOW,
};

export const prismaOutflowMock: PrismaCashflow & { tags: CashflowTag[] } = {
  id: faker.database.mongodbObjectId(),
  createdAt: new Date(),
  effectiveDate: new Date(),
  amount: +faker.commerce.price(),
  description: faker.lorem.paragraph(),
  tagsIDs: [prismaOutflowTagMock.id],
  tags: [prismaOutflowTagMock],
  type: CashflowType.OUTFLOW,
};

export const prismaCashflowsMock: PrismaCashflow[] = [prismaInflowMock, prismaOutflowMock];

export const inflowMock: Inflow = {
  id: prismaInflowMock.id,
  createdAt: prismaInflowMock.createdAt,
  effectiveDate: prismaInflowMock.effectiveDate,
  amount: prismaInflowMock.amount,
  description: prismaInflowMock.description,
  tags: [prismaInflowTagMock.name],
  type: CashflowType.INFLOW,
};

export const outflowMock: Outflow = {
  id: prismaOutflowMock.id,
  createdAt: prismaOutflowMock.createdAt,
  effectiveDate: prismaOutflowMock.effectiveDate,
  amount: prismaOutflowMock.amount,
  description: prismaOutflowMock.description,
  tags: [prismaOutflowTagMock.name],
  type: CashflowType.OUTFLOW,
};

export const cashflowsMock: Cashflow[] = [inflowMock, outflowMock];
