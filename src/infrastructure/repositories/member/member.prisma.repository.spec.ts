import { DeepMockProxy } from 'jest-mock-extended';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateMemberType } from '@domain/member/member.types';
import { Member } from '@domain/member/member';
import { prismaMock } from '@mocks/prisma/singleton';
import { memberMock } from '@mocks/member.mock';
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
});
