import { Module } from '@nestjs/common';
import { PrismaService } from '@infrastructure/prisma.service';
import { MemberRepository } from '@domain/member/member.repository';
import { MemberPrismaRepository } from './member.prisma.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: MemberRepository,
      useClass: MemberPrismaRepository,
    },
  ],
  exports: [MemberRepository],
})
export class MemberRepositoryModule {}
