import { CashflowTag } from '@domain/cashflow/cashflow-tag/cashflow-tag';
import { CashflowTagFactory } from '@domain/cashflow/cashflow-tag/cashflow-tag.factory';
import { CashflowTagRepository } from '@domain/cashflow/cashflow-tag/cashflow-tag.repository';
import { CashflowTagQueryType } from '@domain/cashflow/cashflow-tag/cashflow-tag.types';
import { CashflowType } from '@domain/cashflow/cashflow-type.enum';
import { PrismaService } from '@infrastructure/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class CashflowTagPrismaRepository extends CashflowTagRepository {
  constructor(private readonly _prismaService: PrismaService) {
    super();
  }

  public async findMany(query: CashflowTagQueryType): Promise<CashflowTag[]> {
    const cashflowTags = await this._prismaService.cashflowTag.findMany({
      where: {
        name: { contains: query.search, mode: Prisma.QueryMode.insensitive },
        type: query.type,
      },
    });

    return cashflowTags.map(({ id, name, type }) => (
      CashflowTagFactory.create({
        id,
        name,
        type: type as CashflowType,
      })
    ));
  }

  public async findById(id: string): Promise<CashflowTag | null> {
    const cashflowTag = await this._prismaService.cashflowTag.findUnique({ where: { id } });
    if (!cashflowTag) return null;

    const { name, type } = cashflowTag;

    return CashflowTagFactory.create({
      id,
      name,
      type: type as CashflowType,
    });
  }

  public async delete(id: string): Promise<CashflowTag> {
    const { name, type } = await this._prismaService.cashflowTag.delete({ where: { id } });

    return CashflowTagFactory.create({
      id,
      name,
      type: type as CashflowType,
    });
  }
}
