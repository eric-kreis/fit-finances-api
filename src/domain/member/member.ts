export class Member {
  public readonly id: string;

  public readonly createdAt: Date;

  public readonly updatedAt: Date;

  public readonly cpf: string;

  public readonly email: string;

  public readonly name: string;

  public readonly phoneNumber: string | null;

  constructor(member: Member) {
    this.id = member.id;
    this.createdAt = member.createdAt;
    this.updatedAt = member.updatedAt;
    this.cpf = member.cpf;
    this.email = member.email;
    this.name = member.name;
    this.phoneNumber = member.phoneNumber;
  }
}
