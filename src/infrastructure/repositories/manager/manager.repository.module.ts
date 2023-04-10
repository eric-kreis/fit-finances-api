import { Module } from '@nestjs/common';
import { ManagerRepository } from '@domain/manager/manager.repository';
import { PrismaService } from '@infrastructure/prisma.service';
import { ManagerPrismaRepository } from './manager.prisma.repositoy';

@Module({
  providers: [
    PrismaService,
    {
      provide: ManagerRepository,
      useClass: ManagerPrismaRepository,
    },
  ],
  exports: [ManagerRepository],
})
export class ManagerRepositoryModule {}
