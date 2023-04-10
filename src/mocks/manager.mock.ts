import { Manager } from '@domain/manager/manager';
import { faker } from '@faker-js/faker';
import { Manager as PrismaManager } from '@prisma/client';

export const managerMock: Manager = {
  id: faker.database.mongodbObjectId(),
  createdAt: new Date(),
  updatedAt: new Date(),
  email: faker.internet.email(),
};

export const prismaManagerMock: PrismaManager = {
  ...managerMock,
  password: faker.internet.password(),
};
