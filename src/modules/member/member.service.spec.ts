import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';
import { Test, TestingModule } from '@nestjs/testing';
import { MemberRepository } from '@domain/member/member.repository';
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
});
