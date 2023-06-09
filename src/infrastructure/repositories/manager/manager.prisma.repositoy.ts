import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
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

  public async findById(id: string): Promise<Manager | null> {
    const manager = await this._prismaService.manager.findUnique({ where: { id } });
    if (!manager) return manager;

    return new Manager(manager);
  }

  public async findByCredentials(email: string, password: string): Promise<Manager | null> {
    const manager = await this._prismaService.manager.findUnique({ where: { email } });
    if (!manager) return manager;

    const passwordMatch = await bcrypt.compare(password, manager.password);
    if (!passwordMatch) return null;

    return new Manager(manager);
  }

  public async update(id: string, payload: Partial<CreateManagerType>): Promise<Manager> {
    if (payload.email) {
      const managerWithEmail = await this._prismaService.manager.findUnique({
        where: { email: payload.email },
      });

      if (managerWithEmail && managerWithEmail.id !== id) {
        throw new ManagerAlreadyRegistredException();
      }
    }

    const updateManageData: Prisma.ManagerUpdateInput = {
      email: payload.email,
    };

    if (payload.password) updateManageData.password = await bcrypt.hash(payload.password, 10);

    const updatedManager = await this._prismaService.manager.update({
      where: { id },
      data: updateManageData,
    });

    return new Manager(updatedManager);
  }
}
