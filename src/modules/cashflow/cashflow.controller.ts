import { Controller, Get, Post, Body, Param, Delete, Query, UseGuards, HttpStatus } from '@nestjs/common';
import { BadRequestSwagger, NotFoundSwagger, SuccessSwagger, UnauthorizedSwagger } from '@swagger/responses';
import { createDocDescription } from '@swagger/utils';
import { MongoIdDto } from '@shared/dtos/mongo-id.dto';
import { JwtAuthGuard } from '@auth/guards/jwt.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CashflowService } from '@domain/cashflow/cashflow.service';
import { CashflowSummaryService } from '@domain/cashflow-summary/cashflow-summary.service';
import { CreateCashflowDto } from './dto/create-cashflow.dto';
import { CashflowPaginationDto } from './dto/cashflow-pagination.dto';
import { CashflowEntity } from './entities/cashflow.entity';

@ApiBearerAuth()
@ApiTags('Fluxo de caixa')
@UseGuards(JwtAuthGuard)
@BadRequestSwagger()
@UnauthorizedSwagger()
@Controller('cashflow')
export class CashflowController {
  constructor(
    private readonly _cashflowService: CashflowService,
    private readonly _cashflowSummaryService: CashflowSummaryService,
  ) {}

  @ApiOperation({
    summary: 'Crie um registro no fluxo de caixa',
    description: createDocDescription(
      'Utilize este recurso para adicionar um registro no fluxo de caixa',
      { field: 'amount', constrain: 'deve ser um número positivo', required: true },
      { field: 'effectiveDate', constrain: 'deve ser uma data em sintaxe aceita pelo JavaScript (hora será desconsiderada)', required: true },
      { field: 'description', constrain: 'descrição do registro (utilizada na busca)' },
      { field: 'tags', constrain: 'lista com as tags para encontrar o registro', required: true },
      { field: 'type', constrain: 'tipo do registro (INFLOW ou OUTFLOW)', required: true },
    ),
  })
  @SuccessSwagger({
    description: 'Registro criado com sucesso',
    type: CashflowEntity,
  }, HttpStatus.CREATED)
  @Post()
  public async create(@Body() createCashflowDto: CreateCashflowDto): Promise<CashflowEntity> {
    const cashflow = await this._cashflowService.create(createCashflowDto);
    await this._cashflowSummaryService.updateSummary(cashflow, 'creation');
    return cashflow;
  }

  @ApiOperation({
    summary: 'Liste registros',
    description: createDocDescription('Utilize este recurso para listar vários registros de caixa'),
  })
  @SuccessSwagger({
    description: 'Registros encontrados com sucesso',
    type: [CashflowEntity],
  })
  @Get()
  public async findMany(@Query() query: CashflowPaginationDto): Promise<CashflowEntity[]> {
    return this._cashflowService.findMany(query);
  }

  @ApiOperation({
    summary: 'Encontre um registro a partir de um ID',
    description: createDocDescription('Utilize este recurso para encontrar um registro a partir de seu ID'),
  })
  @SuccessSwagger({
    description: 'Registro encontrado com sucesso',
    type: CashflowEntity,
  })
  @NotFoundSwagger()
  @Get(':id')
  public async findById(@Param() { id }: MongoIdDto): Promise<CashflowEntity> {
    return this._cashflowService.findById(id);
  }

  @ApiOperation({
    summary: 'Delete um registro no fluxo de caixa',
    description: createDocDescription('Utilize este recurso para excluir um registro'),
  })
  @SuccessSwagger({
    description: 'Registro deletado com sucesso',
    type: CashflowEntity,
  })
  @Delete(':id')
  public async delete(@Param() { id }: MongoIdDto): Promise<CashflowEntity> {
    const cashflow = await this._cashflowService.delete(id);
    await this._cashflowSummaryService.updateSummary(cashflow, 'deletion');
    return cashflow;
  }
}
