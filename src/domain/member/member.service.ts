import { Member } from './member';

export abstract class MemberService {
  public abstract create(data: Omit<Member, 'id' | 'createdAt' | 'updatedAt'>): Promise<Member>;

  public abstract findById(id: string): Promise<Member>;

  public abstract findByCPF(cpf: string): Promise<Member>;

  public abstract findByEmail(email: string): Promise<Member>;

  public abstract update(id: string, paylaod: Partial<Member>): Promise<Member>;

  public abstract delete(id: string): Promise<Member>;
}
