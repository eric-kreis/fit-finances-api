import { Module } from '@nestjs/common';
import { CashflowSummaryService as DomainCashflowSummaryService } from '@domain/cashflow-summary/cashflow-summary.service';
import { CashflowSummaryRepositoryModule } from '@infrastructure/repositories/cashflow-summary/cashflow-summary.repository.module';
import { CashflowSummaryService } from './cashflow-summary.service';
import { CashflowSummaryController } from './cashflow-summary.controller';

@Module({
  imports: [CashflowSummaryRepositoryModule],
  controllers: [CashflowSummaryController],
  providers: [
    {
      provide: DomainCashflowSummaryService,
      useClass: CashflowSummaryService,
    },
  ],
  exports: [DomainCashflowSummaryService],
})
export class CashflowSummaryModule {}
