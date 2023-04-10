import { Module } from '@nestjs/common';
import { ManagerRepository } from '@domain/manager/manager.repository';
import { ManagerPrismaRepository } from './manager.prisma.repositoy';
import { PrismaService } from '../../prisma.service';

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
