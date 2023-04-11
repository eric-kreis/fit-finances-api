import { AuthUserEntity } from '@auth/entities/auth-user.entity';
import { faker } from '@faker-js/faker';
import { managerMock } from './manager.mock';

export const authUserMock: AuthUserEntity = {
  accessToken: faker.random.alphaNumeric(),
  user: managerMock,
};
