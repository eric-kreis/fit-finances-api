import { Module } from '@nestjs/common';
import { CashflowRepositoryModule } from '@infrastructure/repositories/cashflow/cashflow.repository.module';
import { CashflowService as DomainCashflowService } from '@domain/cashflow/cashflow.service';
import { CashflowSummaryModule } from '@modules/cashflow-summary/cashflow-summary.module';
import { CashflowService } from './cashflow.service';
import { CashflowController } from './cashflow.controller';

@Module({
  imports: [CashflowRepositoryModule, CashflowSummaryModule],
  controllers: [CashflowController],
  providers: [
    {
      provide: DomainCashflowService,
      useClass: CashflowService,
    },
  ],
  exports: [DomainCashflowService],
})
export class CashflowModule {}
