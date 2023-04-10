import { Manager } from '@domain/manager/manager';
import { faker } from '@faker-js/faker';

export const managerMock: Manager = {
  id: faker.database.mongodbObjectId(),
  createdAt: new Date(),
  updatedAt: new Date(),
  email: faker.internet.email(),
};
