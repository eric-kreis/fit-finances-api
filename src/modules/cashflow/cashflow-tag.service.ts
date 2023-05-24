import { Injectable } from '@nestjs/common';
import { CashflowTagService as DomainCashflowTagService } from '@domain/cashflow/cashflow-tag/cashflow-tag.service';
import { CashflowNotFoundException } from '@domain/cashflow/exceptions/cashflow-not-found.exception';
import { CashflowTagRepository } from '@domain/cashflow/cashflow-tag/cashflow-tag.repository';
import { CashflowTag } from '@domain/cashflow/cashflow-tag/cashflow-tag';
import { CashflowTagQueryDto } from './dto/cashflow-tag-query.dto';

@Injectable()
export class CashflowService extends DomainCashflowTagService {
  constructor(private readonly _cashflowTagRepository: CashflowTagRepository) {
    super();
  }

  public async findMany(query: CashflowTagQueryDto): Promise<CashflowTag[]> {
    return this._cashflowTagRepository.findMany(query);
  }

  public async delete(id: string): Promise<CashflowTag> {
    const cashflow = await this._cashflowTagRepository.findById(id);
    if (!cashflow) throw new CashflowNotFoundException('Tag not found');
    return this._cashflowTagRepository.delete(id);
  }
}
