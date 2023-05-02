import { Cashflow } from '@domain/cashflow/cashflow';
import { CashflowType } from '@domain/cashflow/cashflow-type.enum';
import { CashflowFactory } from '@domain/cashflow/cashflow.factory';
import { CashflowRepository } from '@domain/cashflow/cashflow.repository';
import { CashflowPaginationType, CreateCashflowType } from '@domain/cashflow/cashflow.types';
import { PrismaService } from '@infrastructure/prisma.service';
import { Injectable } from '@nestjs/common';
import { CashflowTag, Cashflow as PrismaCashflow, Prisma } from '@prisma/client';

@Injectable()
export class CashflowPrismaRepository extends CashflowRepository {
  constructor(private readonly _prismaService: PrismaService) {
    super();
  }

  public async create(data: CreateCashflowType): Promise<Cashflow> {
    const cashflow = await this._prismaService.cashflow.create({
      data: {
        amount: data.amount,
        description: data.description,
        effectiveDate: data.effectiveDate,
        type: data.type,
        tags: {
          connectOrCreate: data.tags.map((tag) => ({
            where: {
              nameType: { name: tag, type: data.type },
            },
            create: {
              name: tag,
              type: data.type,
            },
          })),
        },
      },
      include: {
        tags: true,
      },
    });

    return this._formatPrismaCashflow(cashflow);
  }

  public async findMany({
    page,
    limit,
    orderBy,
    sort,
    search,
    type,
  }: CashflowPaginationType): Promise<Cashflow[]> {
    const where: Prisma.CashflowWhereInput = {};

    if (type) where.type = type;
    if (search) {
      where.OR = [
        { description: { contains: search, mode: 'insensitive' } },
        { tags: { some: { name: { contains: search, mode: 'insensitive' } } } },
      ];
    }

    const cashflows = await this._prismaService.cashflow.findMany({
      where,
      skip: page * limit,
      take: limit,
      orderBy: { [orderBy]: sort },
      include: {
        tags: true,
      },
    });

    return cashflows.map(this._formatPrismaCashflow);
  }

  public async findById(id: string): Promise<Cashflow | null> {
    const cashflow = await this._prismaService.cashflow.findUnique({
      where: { id },
      include: {
        tags: true,
      },
    });

    if (!cashflow) return null;

    return this._formatPrismaCashflow(cashflow);
  }

  public async delete(id: string): Promise<Cashflow> {
    const cashflow = await this._prismaService.cashflow.delete({
      where: { id },
      include: {
        tags: true,
      },
    });
    return this._formatPrismaCashflow(cashflow);
  }

  private _formatPrismaCashflow(cashflow: PrismaCashflow & { tags: CashflowTag[] }): Cashflow {
    return CashflowFactory.create({
      ...cashflow,
      tags: cashflow.tags.map(({ name }) => name),
      type: cashflow.type as CashflowType,
    });
  }
}
