import { CashflowSummaryRepository } from '@domain/cashflow-summary/cashflow-summary.repositoy';
import { PrismaService } from '@infrastructure/prisma.service';
import { Module } from '@nestjs/common';
import { CashflowSummaryPrismaRepository } from './cashflow-summary.prisma.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: CashflowSummaryRepository,
      useClass: CashflowSummaryPrismaRepository,
    },
  ],
  exports: [CashflowSummaryRepository],
})
export class CashflowSummaryRepositoryModule {}
