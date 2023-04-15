import { Member } from '@domain/member/member';
import { faker } from '@faker-js/faker';

export const memberMock: Member = {
  id: faker.database.mongodbObjectId(),
  createdAt: new Date(),
  updatedAt: new Date(),
  cpf: faker.datatype.number({ min: 1111111111, max: 1111111111 }).toString(),
  email: faker.internet.email(),
  name: faker.name.fullName(),
  phoneNumber: faker.phone.number('+55 61 #####-####'),
};

export const membersMock: Member[] = [memberMock];
