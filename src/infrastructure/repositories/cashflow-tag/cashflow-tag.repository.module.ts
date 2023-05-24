import { Module } from '@nestjs/common';
import { PrismaService } from '@infrastructure/prisma.service';
import { CashflowTagRepository } from '@domain/cashflow/cashflow-tag/cashflow-tag.repository';
import { CashflowTagPrismaRepository } from './cashflow-tag.prisma.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: CashflowTagRepository,
      useClass: CashflowTagPrismaRepository,
    },
  ],
  exports: [CashflowTagRepository],
})
export class CashflowTagRepositoryModule {}
