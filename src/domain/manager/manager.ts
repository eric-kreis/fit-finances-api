export class Manager {
  public readonly id: string;

  public readonly createdAt: Date;

  public readonly updatedAt: Date;

  public readonly email: string;

  constructor(manager: Manager) {
    this.id = manager.id;
    this.createdAt = manager.createdAt;
    this.updatedAt = manager.updatedAt;
    this.email = manager.email;
  }
}
