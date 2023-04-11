import { Manager } from './manager';
import { UpdateManagerType } from './manager.types';

export abstract class ManagerService {
  public abstract findByCredentials(email: string, password: string): Promise<Manager>;

  public abstract update(
    id: string,
    payload: UpdateManagerType,
    authUserId: string,
  ): Promise<Manager>;
}
