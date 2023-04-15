import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';
import { Test, TestingModule } from '@nestjs/testing';
import { DomainSortOrder } from '@domain/enums';
import { MemberRepository } from '@domain/member/member.repository';
import { MemberNotFoundException } from '@domain/member/exceptions/member-not-found.exception';
import { memberMock, membersMock } from '@mocks/member.mock';
import { MemberService } from './member.service';

const memberRepositoryMock = mockDeep<MemberRepository>();

describe('MemberService', () => {
  let sut: MemberService;
  let memberRepository: DeepMockProxy<MemberRepository>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MemberService,
        {
          provide: MemberRepository,
          useValue: memberRepositoryMock,
        },
      ],
    }).compile();

    sut = module.get<MemberService>(MemberService);
    memberRepository = module.get<DeepMockProxy<MemberRepository>>(MemberRepository);
  });

  beforeEach(() => {
    mockReset(memberRepository);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(sut.create).toBeDefined();
    expect(sut.findMany).toBeDefined();
    expect(sut.findById).toBeDefined();
    expect(sut.findByCpf).toBeDefined();
    expect(sut.findByEmail).toBeDefined();
    expect(sut.update).toBeDefined();
    expect(sut.delete).toBeDefined();
  });

  describe('create()', () => {
    it('should return a new member', async () => {
      memberRepository.create.mockResolvedValue(memberMock);

      expect.assertions(2);

      const member = await sut.create(memberMock);

      expect(memberRepository.create).toHaveBeenCalledTimes(1);
      expect(member).toEqual(memberMock);
    });
  });

  describe('findMany()', () => {
    it('should return members', async () => {
      memberRepository.findMany.mockResolvedValue(membersMock);

      expect.assertions(2);

      const members = await sut.findMany({
        page: 0,
        limit: 10,
        orderBy: 'createdAt',
        sort: DomainSortOrder.asc,
        search: '@gmail.com',
      });

      expect(memberRepository.findMany).toHaveBeenCalledTimes(1);
      expect(members).toEqual(membersMock);
    });
  });

  describe('findById()', () => {
    it('should return a member', async () => {
      memberRepository.findOne.mockResolvedValue(memberMock);

      expect.assertions(2);

      const member = await sut.findById(memberMock.id);

      expect(memberRepository.findOne).toHaveBeenCalledTimes(1);
      expect(member).toEqual(memberMock);
    });

    it('should throw a member not found exception', async () => {
      memberRepository.findOne.mockResolvedValue(null);

      expect.assertions(3);

      try {
        await sut.findById(memberMock.id);
      } catch (e) {
        expect(memberRepository.findOne).toHaveBeenCalledTimes(1);
        expect(e).toBeDefined();
        expect(e).toBeInstanceOf(MemberNotFoundException);
      }
    });
  });

  describe('findByCpf()', () => {
    it('should return a member', async () => {
      memberRepository.findOne.mockResolvedValue(memberMock);

      expect.assertions(2);

      const member = await sut.findByCpf(memberMock.cpf);

      expect(memberRepository.findOne).toHaveBeenCalledTimes(1);
      expect(member).toEqual(memberMock);
    });

    it('should throw a member not found exception', async () => {
      memberRepository.findOne.mockResolvedValue(null);

      expect.assertions(3);

      try {
        await sut.findByCpf(memberMock.cpf);
      } catch (e) {
        expect(memberRepository.findOne).toHaveBeenCalledTimes(1);
        expect(e).toBeDefined();
        expect(e).toBeInstanceOf(MemberNotFoundException);
      }
    });
  });

  describe('findByEmail()', () => {
    it('should return a member', async () => {
      memberRepository.findOne.mockResolvedValue(memberMock);

      expect.assertions(2);

      const member = await sut.findByEmail(memberMock.email);

      expect(memberRepository.findOne).toHaveBeenCalledTimes(1);
      expect(member).toEqual(memberMock);
    });

    it('should throw a member not found exception', async () => {
      memberRepository.findOne.mockResolvedValue(null);

      expect.assertions(3);

      try {
        await sut.findByEmail(memberMock.email);
      } catch (e) {
        expect(memberRepository.findOne).toHaveBeenCalledTimes(1);
        expect(e).toBeDefined();
        expect(e).toBeInstanceOf(MemberNotFoundException);
      }
    });
  });

  describe('update()', () => {
    it('should return an updated member', async () => {
      memberRepository.findOne.mockResolvedValue(memberMock);
      memberRepository.update.mockResolvedValue(memberMock);

      expect.assertions(3);

      const updatedMember = await sut.update(memberMock.id, memberMock);

      expect(memberRepository.findOne).toHaveBeenCalledTimes(1);
      expect(memberRepository.update).toHaveBeenCalledTimes(1);
      expect(updatedMember).toEqual(memberMock);
    });

    it('should throw a member not found exception', async () => {
      memberRepository.findOne.mockResolvedValue(null);

      expect.assertions(4);

      try {
        await sut.update(memberMock.id, memberMock);
      } catch (e) {
        expect(memberRepository.findOne).toHaveBeenCalledTimes(1);
        expect(memberRepository.update).toHaveBeenCalledTimes(0);
        expect(e).toBeDefined();
        expect(e).toBeInstanceOf(MemberNotFoundException);
      }
    });
  });

  describe('delete()', () => {
    it('should return the deleted member', async () => {
      memberRepository.findOne.mockResolvedValue(memberMock);
      memberRepository.delete.mockResolvedValue(memberMock);

      expect.assertions(3);

      const deletedMember = await sut.delete(memberMock.id);

      expect(memberRepository.findOne).toHaveBeenCalledTimes(1);
      expect(memberRepository.delete).toHaveBeenCalledTimes(1);
      expect(deletedMember).toEqual(memberMock);
    });

    it('should throw a member not found exception', async () => {
      memberRepository.findOne.mockResolvedValue(null);

      expect.assertions(4);

      try {
        await sut.delete(memberMock.id);
      } catch (e) {
        expect(memberRepository.findOne).toHaveBeenCalledTimes(1);
        expect(memberRepository.delete).toHaveBeenCalledTimes(0);
        expect(e).toBeDefined();
        expect(e).toBeInstanceOf(MemberNotFoundException);
      }
    });
  });
});
