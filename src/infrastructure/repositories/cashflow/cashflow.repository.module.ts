import { Module } from '@nestjs/common';
import { PrismaService } from '@infrastructure/prisma.service';
import { CashflowRepository } from '@domain/cashflow/cashflow.repository';
import { CashflowPrismaRepository } from './cashflow.prisma.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: CashflowRepository,
      useClass: CashflowPrismaRepository,
    },
  ],
  exports: [CashflowRepository],
})
export class CashflowRepositoryModule {}
