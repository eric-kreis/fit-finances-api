import { Cashflow } from '@domain/cashflow/cashflow';
import { CashflowRepository } from '@domain/cashflow/cashflow.repository';
import { CreateCashflowType } from '@domain/cashflow/cashflow.types';
import { PrismaService } from '@infrastructure/prisma.service';

export class CashflowPrismaRepository extends CashflowRepository {
  constructor(private readonly _prismaService: PrismaService) {
    super();
  }

  public async create(data: CreateCashflowType): Promise<Cashflow> {
    throw new Error('Method not implemented.');
  }

  public async find(search: any): Promise<Cashflow[]> {
    throw new Error('Method not implemented.');
  }

  public async findById(id: string): Promise<Cashflow | null> {
    throw new Error('Method not implemented.');
  }

  public async delete(id: string): Promise<Cashflow> {
    throw new Error('Method not implemented.');
  }
}
