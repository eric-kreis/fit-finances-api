import { Injectable } from '@nestjs/common';
import { ManagerService as DomainManagerService } from '@domain/manager/manager.service';
import { Manager } from '@domain/manager/manager';
import { ManagerRepository } from '@domain/manager/manager.repository';
import { UpdateManagerDto } from './dto/update-manager.dto';

@Injectable()
export class ManagerService extends DomainManagerService {
  constructor(
    private readonly _managerRepository: ManagerRepository,
  ) {
    super();
  }

  public async findByCredentials(email: string, password: string): Promise<Manager> {
    throw new Error('Method not implemented.');
  }

  public async update(id: string, payload: UpdateManagerDto): Promise<Manager> {
    throw new Error('Method not implemented.');
  }
}
