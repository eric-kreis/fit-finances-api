import { Module } from '@nestjs/common';
import { MemberService as DomainMemberService } from '@domain/member/member.service';
import { MemberRepositoryModule } from '@infrastructure/repositories/member/member.repository.module';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';

@Module({
  imports: [MemberRepositoryModule],
  controllers: [MemberController],
  providers: [
    {
      provide: DomainMemberService,
      useClass: MemberService,
    },
  ],
  exports: [DomainMemberService],
})
export class MemberModule {}
