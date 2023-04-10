import { Manager } from './manager';
import { CreateManagerType, UpdateManagerType } from './manager.types';

export abstract class ManagerRepository {
  public abstract create(data: CreateManagerType): Promise<Manager>;

  public abstract findById(id: string): Promise<Manager | null>;

  public abstract findByCredentials(email: string, password: string): Promise<Manager | null>;

  public abstract update(id: string, payload: UpdateManagerType): Promise<Manager>;
}
