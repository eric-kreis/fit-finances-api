import { JwtAuthGuard } from '@auth/guards/jwt.guard';
import { CashflowSummaryService } from '@domain/cashflow-summary/cashflow-summary.service';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BadRequestSwagger, SuccessSwagger, UnauthorizedSwagger } from '@swagger/responses';
import { createDocDescription } from '@swagger/utils';
import { CashflowSummaryEntity } from './entities/cashflow-summary.entity';
import { GetMonthlySummariesDto } from './dto/get-monthly-summary.dto';

@ApiBearerAuth()
@UnauthorizedSwagger()
@ApiTags('Fluxo de caixa')
@UseGuards(JwtAuthGuard)
@Controller('cashflow-summary')
export class CashflowSummaryController {
  constructor(private readonly _cashflowSummaryService: CashflowSummaryService) {}

  @ApiOperation({
    summary: 'Receba o resumo do fluxo de caixa com dados anuais',
    description: createDocDescription('Utilize este recurso para receber o resumo do fluxo de caixa de forma anual'),
  })
  @SuccessSwagger({
    description: 'Resumo encontrado com sucesso',
    type: [CashflowSummaryEntity],
  })
  @Get('annual')
  public async getAnnualSummaries(): Promise<CashflowSummaryEntity[]> {
    return this._cashflowSummaryService.getAnnualSummaries();
  }

  @ApiOperation({
    summary: 'Receba o resumo do fluxo de caixa com dados mensais',
    description: createDocDescription('Utilize este recurso para receber o resumo do fluxo de caixa de forma mensal'),
  })
  @SuccessSwagger({
    description: 'Resumo encontrado com sucesso',
    type: [CashflowSummaryEntity],
  })
  @Get('monthly')
  @BadRequestSwagger()
  public async getMonthlySummaries(
    @Query() { year }: GetMonthlySummariesDto,
  ): Promise<CashflowSummaryEntity[]> {
    return this._cashflowSummaryService.getMonthlySummaries(year);
  }
}
