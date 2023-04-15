import { Member } from '@domain/member/member';
import { MemberRepository } from '@domain/member/member.repository';
import { CreateMemberType, MemberPaginationType, FindOneMemberType } from '@domain/member/member.types';
import { PrismaService } from '@infrastructure/prisma.service';

export class MemberPrismaRepository extends MemberRepository {
  constructor(
    private readonly _prismaService: PrismaService,
  ) {
    super();
  }

  public create(data: CreateMemberType): Promise<Member> {
    throw new Error('Method not implemented.');
  }

  public findMany(query: MemberPaginationType): Promise<Member[]> {
    throw new Error('Method not implemented.');
  }

  public findOne(query: FindOneMemberType): Promise<Member | null> {
    throw new Error('Method not implemented.');
  }

  public update(id: string, payload: Partial<CreateMemberType>): Promise<Member> {
    throw new Error('Method not implemented.');
  }

  public delete(id: string): Promise<Member> {
    throw new Error('Method not implemented.');
  }
}
