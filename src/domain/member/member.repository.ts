import { Member } from './member';
import { CreateMemberType, FindOneMemberType, MemberPaginationType, UpdateMemberType } from './member.types';

export abstract class MemberRepository {
  public abstract create(data: CreateMemberType): Promise<Member>;

  public abstract findMany(query: MemberPaginationType): Promise<Member[]>;

  public abstract findOne(query: FindOneMemberType): Promise<Member | null>;

  public abstract update(id: string, payload: UpdateMemberType): Promise<Member>;

  public abstract delete(id: string): Promise<Member>;
}
