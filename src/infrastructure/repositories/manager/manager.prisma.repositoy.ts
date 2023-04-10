import { Manager } from '@domain/manager/manager';
import { ManagerRepository } from '@domain/manager/manager.repository';
import { CreateManagerType } from '@domain/manager/manager.types';
import { PrismaService } from '../../prisma.service';

export class ManagerPrismaRepository extends ManagerRepository {
  constructor(private readonly _prismaService: PrismaService) {
    super();
  }

  public create(data: CreateManagerType): Promise<Manager> {
    throw new Error('Method not implemented.');
  }

  public findById(id: string): Promise<Manager> {
    throw new Error('Method not implemented.');
  }

  public async findByCredentials(email: string, password: string): Promise<Manager | null> {
    throw new Error('Method not implemented.');
  }

  public update(id: string, payload: Partial<CreateManagerType>): Promise<Manager> {
    throw new Error('Method not implemented.');
  }
}
