import { DeepMockProxy } from 'jest-mock-extended';
import { Test, TestingModule } from '@nestjs/testing';
import { prismaMock } from '@mocks/prisma/singleton';
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
});
