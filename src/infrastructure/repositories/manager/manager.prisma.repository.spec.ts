import * as bcrypt from 'bcrypt';
import { Test, TestingModule } from '@nestjs/testing';
import { prismaMock } from '@mocks/prisma/singleton';
import { DeepMockProxy } from 'jest-mock-extended';
import { managerMock, prismaManagerMock } from '@mocks/manager.mock';
import { Manager } from '@domain/manager/manager';
import { ManagerAlreadyRegistredException } from '@domain/manager/exceptions/manager-already-registred.exception';
import { PrismaService } from '../../prisma.service';
import { ManagerPrismaRepository } from './manager.prisma.repositoy';

describe('ManagerPrismaRepository', () => {
  let sut: ManagerPrismaRepository;
  let prismaService: DeepMockProxy<PrismaService>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ManagerPrismaRepository,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    sut = module.get<ManagerPrismaRepository>(ManagerPrismaRepository);
    prismaService = module.get<DeepMockProxy<PrismaService>>(PrismaService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(sut.create).toBeDefined();
    expect(sut.findById).toBeDefined();
    expect(sut.findByCredentials).toBeDefined();
    expect(sut.update).toBeDefined();
  });

  describe('create()', () => {
    it('should return a new manager', async () => {
      prismaService.manager.create.mockResolvedValue(prismaManagerMock);

      expect.assertions(2);

      const manager = await sut.create({
        email: prismaManagerMock.email,
        password: prismaManagerMock.password,
      });

      expect(manager).toEqual(managerMock);
      expect(manager).toBeInstanceOf(Manager);
    });

    it('should throw a manager already registred exception', async () => {
      prismaService.manager.findUnique.mockResolvedValue(prismaManagerMock);

      expect.assertions(2);

      try {
        await sut.create({
          email: prismaManagerMock.email,
          password: prismaManagerMock.password,
        });
      } catch (e) {
        expect(e).toBeDefined();
        expect(e).toBeInstanceOf(ManagerAlreadyRegistredException);
      }
    });
  });

  describe('findById()', () => {
    it('should return a manager', async () => {
      prismaService.manager.findUnique.mockResolvedValue(prismaManagerMock);

      expect.assertions(2);

      const manager = await sut.findById(managerMock.id);

      expect(manager).toEqual(managerMock);
      expect(manager).toBeInstanceOf(Manager);
    });

    it('should return null', async () => {
      prismaService.manager.findUnique.mockResolvedValue(null);

      expect.assertions(1);

      const manager = await sut.findById(managerMock.id);

      expect(manager).toBeNull();
    });
  });

  describe('findByCredentials()', () => {
    it('should return a manager', async () => {
      prismaService.manager.findUnique.mockResolvedValue({
        ...prismaManagerMock,
        password: bcrypt.hashSync(prismaManagerMock.password, 10),
      });

      expect.assertions(2);

      const manager = await sut.findByCredentials(
        prismaManagerMock.email,
        prismaManagerMock.password,
      );

      expect(manager).toEqual(managerMock);
      expect(manager).toBeInstanceOf(Manager);
    });

    it('should return null', async () => {
      prismaService.manager.findUnique.mockResolvedValue(null);

      expect.assertions(1);

      const manager = await sut.findByCredentials(
        prismaManagerMock.email,
        prismaManagerMock.password,
      );

      expect(manager).toBeNull();
    });
  });

  describe('update()', () => {
    it('should return the updated manager', async () => {
      prismaService.manager.findUnique.mockResolvedValue(prismaManagerMock);
      prismaService.manager.update.mockResolvedValue(prismaManagerMock);

      expect.assertions(2);

      const manager = await sut.update(managerMock.id, {
        email: prismaManagerMock.email,
        password: prismaManagerMock.password,
      });

      expect(manager).toEqual(managerMock);
      expect(manager).toBeInstanceOf(Manager);
    });

    it('should throw a manager already registred exception', async () => {
      prismaService.manager.findUnique.mockResolvedValue({ ...prismaManagerMock, id: 'id' });

      expect.assertions(2);

      try {
        await sut.update(managerMock.id, {
          email: prismaManagerMock.email,
          password: prismaManagerMock.password,
        });
      } catch (e) {
        expect(e).toBeDefined();
        expect(e).toBeInstanceOf(ManagerAlreadyRegistredException);
      }
    });
  });
});
