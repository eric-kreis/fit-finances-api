import { Injectable } from '@nestjs/common';
import { Cashflow } from '@domain/cashflow/cashflow';
import { CashflowService as DomainCashflowService } from '@domain/cashflow/cashflow.service';
import { CashflowRepository } from '@domain/cashflow/cashflow.repository';
import { CashflowNotFoundException } from '@domain/cashflow/exceptions/cashflow-not-found.exception';
import { CreateCashflowDto } from './dto/create-cashflow.dto';
import { CashflowPaginationDto } from './dto/cashflow-pagination.dto';

@Injectable()
export class CashflowService extends DomainCashflowService {
  constructor(private readonly _cashflowRepository: CashflowRepository) {
    super();
  }

  public async create(data: CreateCashflowDto): Promise<Cashflow> {
    return this._cashflowRepository.create(data);
  }

  public async findMany(query: CashflowPaginationDto): Promise<Cashflow[]> {
    return this._cashflowRepository.findMany(query);
  }

  public async findById(id: string): Promise<Cashflow> {
    const cashflow = await this._cashflowRepository.findById(id);
    if (!cashflow) throw new CashflowNotFoundException();
    return cashflow;
  }

  public async delete(id: string): Promise<Cashflow> {
    const cashflow = await this._cashflowRepository.findById(id);
    if (!cashflow) throw new CashflowNotFoundException();
    return this._cashflowRepository.delete(id);
  }
}
