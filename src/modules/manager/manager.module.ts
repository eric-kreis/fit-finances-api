import { Module } from '@nestjs/common';
import { ManagerRepositoryModule } from '@infrastructure/repositories/manager/manager.repository.module';
import { ManagerService as DomainManagerService } from '@domain/manager/manager.service';
import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';

@Module({
  imports: [ManagerRepositoryModule],
  controllers: [ManagerController],
  providers: [
    {
      provide: DomainManagerService,
      useClass: ManagerService,
    },
  ],
  exports: [DomainManagerService],
})
export class ManagerModule {}
