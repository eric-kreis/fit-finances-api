import { Module } from '@nestjs/common';
import { ManagerRepositoryModule } from '@infrastructure/repositories/manager/manager.repository.module';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';

@Module({
  imports: [ManagerRepositoryModule],
  controllers: [ManagerController],
  providers: [
    ManagerService,
  ],
  exports: [ManagerService],
})
export class ManagerModule {}
