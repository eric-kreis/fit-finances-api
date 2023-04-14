import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.ts?$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.json',
      },
    ],
  },
  coverageDirectory: '../coverage',
  coveragePathIgnorePatterns: [
    '<rootDir>/infra/prisma.service.ts',
  ],
  moduleNameMapper: {
    '^@auth/(.*)': '<rootDir>/auth/$1',
    '^@config/(.*)': '<rootDir>/config/$1',
    '^@domain/(.*)': '<rootDir>/domain/$1',
    '^@infrastructure/(.*)': '<rootDir>/infrastructure/$1',
    '^@mocks/(.*)': '<rootDir>/mocks/$1',
    '^@modules/(.*)': '<rootDir>/modules/$1',
    '^@shared/(.*)': '<rootDir>/shared/$1',
    '^@swagger/(.*)': '<rootDir>/swagger/$1',
  },
};

export default config;
