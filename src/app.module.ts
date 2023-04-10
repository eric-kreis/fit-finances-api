import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ManagerModule } from '@modules/manager/manager.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ManagerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
