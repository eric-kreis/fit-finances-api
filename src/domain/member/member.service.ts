import { Member } from './member';
import { CreateMemberType, MemberPaginationType, UpdateMemberType } from './member.types';

export abstract class MemberService {
  public abstract create(data: CreateMemberType): Promise<Member>;

  public abstract findMany(query: MemberPaginationType): Promise<Member[]>;

  public abstract findById(id: string): Promise<Member>;

  public abstract findByCpf(cpf: string): Promise<Member>;

  public abstract findByEmail(email: string): Promise<Member>;

  public abstract update(id: string, paylaod: UpdateMemberType): Promise<Member>;

  public abstract delete(id: string): Promise<Member>;
}
