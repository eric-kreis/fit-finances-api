import { Body, Controller, Param, Patch, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@auth/guards/jwt.guard';
import { MongoIdDto } from '@shared/dtos/mongo-id.dto';
import { ManagerService } from '@domain/manager/manager.service';
import { ForbiddenSwagger, NotFoundSwagger, SuccessSwagger, UnauthorizedSwagger } from '@swagger/responses';
import { Manager } from '@domain/manager/manager';
import { createDocDescription } from '@swagger/utils';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { ManagerEntity } from './entities/manager.entity';

@ApiBearerAuth()
@ApiTags('Gestor')
@UseGuards(JwtAuthGuard)
@Controller('manager')
export class ManagerController {
  constructor(private readonly _managerService: ManagerService) {}

  @ApiOperation({
    summary: 'Atualize um gestor',
    description: createDocDescription(
      'Utilize este recurso para atualizar um gestor',
      { field: 'email', constrain: 'deve ser um email com a sintaxe correta' },
      { field: 'password', constrain: 'deve possuir 8 ou mais caracteres' },
    ),
  })
  @SuccessSwagger({
    description: 'Gestor atualizado com sucesso',
    type: ManagerEntity,
  })
  @UnauthorizedSwagger()
  @ForbiddenSwagger()
  @NotFoundSwagger()
  @Patch(':id')
  public async updateManager(
    @Param() { id }: MongoIdDto,
    @Body() payload: UpdateManagerDto,
    @Request() { user }: { user: Manager },
  ): Promise<ManagerEntity> {
    return this._managerService.update(id, payload, user.id);
  }
}
