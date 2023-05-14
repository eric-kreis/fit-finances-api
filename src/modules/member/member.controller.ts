import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@auth/guards/jwt.guard';
import { MemberService } from '@domain/member/member.service';
import { createDocDescription } from '@swagger/utils';
import { BadRequestSwagger, ConflictSwagger, NotFoundSwagger, SuccessSwagger, UnauthorizedSwagger } from '@swagger/responses';
import { MongoIdDto } from '@shared/dtos/mongo-id.dto';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MemberPaginationDto } from './dto/member-pagination.dto';
import { MemberEntity } from './entities/member.entity';

@ApiBearerAuth()
@ApiTags('Membro')
@BadRequestSwagger()
@UnauthorizedSwagger()
@UseGuards(JwtAuthGuard)
@Controller('member')
export class MemberController {
  constructor(private readonly _memberService: MemberService) {}

  @ApiOperation({
    summary: 'Crie um membro',
    description: createDocDescription(
      'Utilize este recurso para criar um membro',
      { field: 'email', constrain: 'deve ser um email na sintaxe correta', required: true },
      { field: 'cpf', constrain: 'deve ser um CPF na sintaxe esperada', required: true },
      { field: 'name', constrain: 'nome do membro', required: true },
      { field: 'phoneNumber', constrain: 'número de telefone do membro' },
    ),
  })
  @SuccessSwagger({
    description: 'Membro criado com sucesso',
    type: MemberEntity,
  }, HttpStatus.CREATED)
  @ConflictSwagger()
  @Post()
  public async create(@Body() createMemberDto: CreateMemberDto): Promise<MemberEntity> {
    return this._memberService.create(createMemberDto);
  }

  @ApiOperation({
    summary: 'Liste membros',
    description: createDocDescription('Utilize este recurso para listar vários membros'),
  })
  @SuccessSwagger({
    description: 'Membros encontrados com sucesso',
    type: [MemberEntity],
  })
  @Get()
  public async findMany(
    @Query() query: MemberPaginationDto,
  ) {
    return this._memberService.findMany(query);
  }

  @ApiOperation({
    summary: 'Encontre um membro a partir de um ID',
    description: createDocDescription('Utilize este recurso para encontrar um membro a partir de seu ID'),
  })
  @SuccessSwagger({
    description: 'Membro encontrado com sucesso',
    type: MemberEntity,
  })
  @NotFoundSwagger()
  @Get(':id')
  public async findOne(@Param() { id }: MongoIdDto) {
    return this._memberService.findById(id);
  }

  @ApiOperation({
    summary: 'Atualize um membro',
    description: createDocDescription(
      'Utilize este recurso para atualizar um membro',
      { field: 'email', constrain: 'deve ser um email na sintaxe correta' },
      { field: 'cpf', constrain: 'deve ser um CPF na sintaxe esperada' },
      { field: 'name', constrain: 'nome do membro' },
      { field: 'phoneNumber', constrain: 'número de telefone do membro' },
    ),
  })
  @SuccessSwagger({
    description: 'Membro atualizado com sucesso',
    type: MemberEntity,
  })
  @NotFoundSwagger()
  @ConflictSwagger()
  @Patch(':id')
  public async update(
    @Param() { id }: MongoIdDto,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    return this._memberService.update(id, updateMemberDto);
  }

  @ApiOperation({
    summary: 'Delete um membro',
    description: createDocDescription('Utilize este recurso para excluir um membro'),
  })
  @SuccessSwagger({
    description: 'Membro deletado com sucesso',
    type: MemberEntity,
  })
  @NotFoundSwagger()
  @Delete(':id')
  public async delete(@Param() { id }: MongoIdDto) {
    return this._memberService.delete(id);
  }
}
