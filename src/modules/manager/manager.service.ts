import { Injectable } from '@nestjs/common';
import { ManagerService as DomainManagerService } from '@domain/manager/manager.service';
import { Manager } from '@domain/manager/manager';
import { ManagerRepository } from '@domain/manager/manager.repository';
import { ManagerNotFoundException } from '@domain/manager/exceptions/manager-not-found.exception';
import { ManagerForbiddenException } from '@domain/manager/exceptions/manager-forbidden.exception';
import { UpdateManagerDto } from './dto/update-manager.dto';

@Injectable()
export class ManagerService extends DomainManagerService {
  constructor(
    private readonly _managerRepository: ManagerRepository,
  ) {
    super();
  }

  public async findByCredentials(email: string, password: string): Promise<Manager> {
    const manager = await this._managerRepository.findByCredentials(email, password);
    if (!manager) throw new ManagerNotFoundException();
    return manager;
  }

  public async update(
    id: string,
    payload: UpdateManagerDto,
    authUserId: string,
  ): Promise<Manager> {
    if (id !== authUserId) throw new ManagerForbiddenException();
    const oldManager = await this._managerRepository.findById(id);
    if (!oldManager) throw new ManagerNotFoundException();
    return this._managerRepository.update(id, payload);
  }
}
