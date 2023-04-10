import { Manager } from './manager';

export abstract class ManagerService {
  public abstract findByCredentials(email: string, password: string): Promise<Manager>;
}
