import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ManagerModule } from '@modules/manager/manager.module';
import { CashflowModule } from '@modules/cashflow/cashflow.module';
import { CashflowSummaryModule } from '@modules/cashflow-summary/cashflow-summary.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MemberModule } from './modules/member/member.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    ManagerModule,
    MemberModule,
    CashflowModule,
    CashflowSummaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
