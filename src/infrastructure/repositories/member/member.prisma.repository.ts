import { Injectable } from '@nestjs/common';
import { MemberAlreadyRegistredException } from '@domain/member/exceptions/member-already-registred.exception';
import { Member } from '@domain/member/member';
import { MemberRepository } from '@domain/member/member.repository';
import { CreateMemberType, MemberPaginationType, FindOneMemberType } from '@domain/member/member.types';
import { PrismaService } from '@infrastructure/prisma.service';

@Injectable()
export class MemberPrismaRepository extends MemberRepository {
  constructor(
    private readonly _prismaService: PrismaService,
  ) {
    super();
  }

  public async create(data: CreateMemberType): Promise<Member> {
    const memberWithEmail = await this._prismaService.member.findUnique({
      where: { email: data.email },
    });
    if (memberWithEmail) throw new MemberAlreadyRegistredException('Member already registred with this email');

    const memberWithCpf = await this._prismaService.member.findUnique({
      where: { cpf: data.cpf },
    });
    if (memberWithCpf) throw new MemberAlreadyRegistredException('Member already registred with this cpf');

    const newMember = await this._prismaService.member.create({
      data: {
        cpf: data.cpf,
        email: data.email,
        name: data.name,
      },
    });

    return new Member(newMember);
  }

  public async findMany(query: MemberPaginationType): Promise<Member[]> {
    throw new Error('Method not implemented.');
  }

  public async findOne(query: FindOneMemberType): Promise<Member | null> {
    throw new Error('Method not implemented.');
  }

  public async update(id: string, payload: Partial<CreateMemberType>): Promise<Member> {
    throw new Error('Method not implemented.');
  }

  public async delete(id: string): Promise<Member> {
    throw new Error('Method not implemented.');
  }
}
