import { Manager } from './manager';

export abstract class ManagerRepository {
  public abstract findByCredentials(email: string, password: string): Promise<Manager | null>;
}
