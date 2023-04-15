import { DeepMockProxy } from 'jest-mock-extended';
import { Test, TestingModule } from '@nestjs/testing';
import { DomainSortOrder } from '@domain/enums';
import { CreateMemberType, UpdateMemberType } from '@domain/member/member.types';
import { Member } from '@domain/member/member';
import { prismaMock } from '@mocks/prisma/singleton';
import { memberMock, membersMock } from '@mocks/member.mock';
import { MemberAlreadyRegistredException } from '@domain/member/exceptions/member-already-registred.exception';
import { PrismaService } from '../../prisma.service';
import { MemberPrismaRepository } from './member.prisma.repository';

describe('MemberPrismaRepository', () => {
  let sut: MemberPrismaRepository;
  let prismaService: DeepMockProxy<PrismaService>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MemberPrismaRepository,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    sut = module.get<MemberPrismaRepository>(MemberPrismaRepository);
    prismaService = module.get<DeepMockProxy<PrismaService>>(PrismaService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(sut.create).toBeDefined();
    expect(sut.findMany).toBeDefined();
    expect(sut.findOne).toBeDefined();
    expect(sut.update).toBeDefined();
    expect(sut.delete).toBeDefined();
  });

  describe('create()', () => {
    const createMemberData: CreateMemberType = {
      cpf: memberMock.cpf,
      email: memberMock.email,
      name: memberMock.name,
      phoneNumber: memberMock.phoneNumber,
    };

    it('should return a new member', async () => {
      prismaService.member.create.mockResolvedValue(memberMock);

      expect.assertions(2);

      const member = await sut.create(createMemberData);

      expect(member).toEqual(memberMock);
      expect(member).toBeInstanceOf(Member);
    });

    it('should throw a member already registred exception when email is already registred', async () => {
      // email already registred
      prismaService.member.findUnique.mockResolvedValueOnce(memberMock);

      expect.assertions(2);

      try {
        await sut.create(createMemberData);
      } catch (e) {
        expect(e).toBeDefined();
        expect(e).toBeInstanceOf(MemberAlreadyRegistredException);
      }
    });

    it('should throw a member already registred exception when cpf is already registred', async () => {
      // email not registred
      prismaService.member.findUnique.mockResolvedValueOnce(null);
      // cpf already registred
      prismaService.member.findUnique.mockResolvedValueOnce(memberMock);

      expect.assertions(2);

      try {
        await sut.create(createMemberData);
      } catch (e) {
        expect(e).toBeDefined();
        expect(e).toBeInstanceOf(MemberAlreadyRegistredException);
      }
    });
  });

  describe('findMany()', () => {
    it('should return members', async () => {
      prismaService.member.findMany.mockResolvedValue(membersMock);

      expect.assertions(2);

      const members = await sut.findMany({
        page: 0,
        limit: 10,
        orderBy: 'createdAt',
        sort: DomainSortOrder.desc,
        serach: '@gmail.com',
      });

      expect(members).toEqual(membersMock);
      members.forEach((member) => {
        expect(member).toBeInstanceOf(Member);
      });
    });
  });

  describe('findOne()', () => {
    it('should return a member searching by: id, email or cpf', async () => {
      prismaService.member.findUnique.mockResolvedValue(memberMock);

      expect.assertions(6);

      // Querying by ID;
      let member = await sut.findOne({
        id: memberMock.id,
      });

      expect(member).toEqual(memberMock);
      expect(member).toBeInstanceOf(Member);

      // Querying by email;
      member = await sut.findOne({
        email: memberMock.email,
      });

      expect(member).toEqual(memberMock);
      expect(member).toBeInstanceOf(Member);

      // Querying by cpf;
      member = await sut.findOne({
        cpf: memberMock.cpf,
      });

      expect(member).toEqual(memberMock);
      expect(member).toBeInstanceOf(Member);
    });

    it('should return null when no member is found', async () => {
      prismaService.member.findUnique.mockResolvedValue(null);

      expect.assertions(1);

      // Querying by ID;
      const member = await sut.findOne({
        email: memberMock.email,
      });

      expect(member).toBeNull();
    });

    it('should throw an exception with "Error: findOne needs at least one key to search" when no parameter is passed', async () => {
      expect.assertions(3);

      try {
        await sut.findOne({});
      } catch (e) {
        expect(e).toBeDefined();
        expect(e).toBeInstanceOf(Error);
        expect((e as Error).message).toBe('Error: findOne needs at least one key to search');
      }
    });
  });

  describe('findMany()', () => {
    const updateMemberPayload: UpdateMemberType = {
      cpf: memberMock.cpf,
      email: memberMock.email,
      name: memberMock.name,
      phoneNumber: memberMock.phoneNumber,
    };

    it('should return an updated member', async () => {
      prismaService.member.update.mockResolvedValue(memberMock);

      expect.assertions(2);

      const member = await sut.update(memberMock.id, updateMemberPayload);

      expect(member).toEqual(memberMock);
      expect(member).toBeInstanceOf(Member);
    });

    it('should throw a member already registred exception when member email is already registred', async () => {
      // email already registred
      prismaService.member.findUnique.mockResolvedValueOnce(memberMock);

      expect.assertions(2);

      try {
        await sut.update(memberMock.id, updateMemberPayload);
      } catch (e) {
        expect(e).toBeDefined();
        expect(e).toBeInstanceOf(MemberAlreadyRegistredException);
      }
    });

    it('should throw a member already registred exception when member cpf is already registred', async () => {
      // email not registred
      prismaService.member.findUnique.mockResolvedValueOnce(null);
      // cpf already registred
      prismaService.member.findUnique.mockResolvedValueOnce(memberMock);

      expect.assertions(2);

      try {
        await sut.update(memberMock.id, updateMemberPayload);
      } catch (e) {
        expect(e).toBeDefined();
        expect(e).toBeInstanceOf(MemberAlreadyRegistredException);
      }
    });
  });
});
