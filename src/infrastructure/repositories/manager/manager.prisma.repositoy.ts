import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { Manager } from '@domain/manager/manager';
import { ManagerRepository } from '@domain/manager/manager.repository';
import { CreateManagerType } from '@domain/manager/manager.types';
import { ManagerAlreadyRegistredException } from '@domain/manager/exceptions/manager-already-registred.exception';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class ManagerPrismaRepository extends ManagerRepository {
  constructor(private readonly _prismaService: PrismaService) {
    super();
  }

  public async create({ email, password }: CreateManagerType): Promise<Manager> {
    const managerWithEmail = await this._prismaService.manager.findUnique({ where: { email } });

    if (managerWithEmail) throw new ManagerAlreadyRegistredException();

    const hashedPassword = await bcrypt.hash(password, 10);
    const newManager = await this._prismaService.manager.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return new Manager(newManager);
  }

  public findById(id: string): Promise<Manager | null> {
    throw new Error('Method not implemented.');
  }

  public async findByCredentials(email: string, password: string): Promise<Manager | null> {
    throw new Error('Method not implemented.');
  }

  public update(id: string, payload: Partial<CreateManagerType>): Promise<Manager> {
    throw new Error('Method not implemented.');
  }
}
