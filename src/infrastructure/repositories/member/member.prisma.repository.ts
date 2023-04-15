import { Injectable } from '@nestjs/common';
import { DomainSortOrder } from '@domain/enums';
import { Member } from '@domain/member/member';
import { MemberRepository } from '@domain/member/member.repository';
import { MemberAlreadyRegistredException } from '@domain/member/exceptions/member-already-registred.exception';
import { CreateMemberType, MemberPaginationType, FindOneMemberType, UpdateMemberType } from '@domain/member/member.types';
import { PrismaService } from '@infrastructure/prisma.service';
import { Prisma } from '@prisma/client';

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

  public async findMany({
    page = 0,
    limit = 10,
    orderBy = 'createdAt',
    sort = DomainSortOrder.asc,
    serach,
  }: MemberPaginationType): Promise<Member[]> {
    const where: Prisma.MemberWhereInput = {};

    if (serach) {
      where.OR = [
        { email: { contains: serach } },
        { cpf: { contains: serach } },
      ];
    }

    const members = await this._prismaService.member.findMany({
      where,
      skip: page * limit,
      take: limit,
      orderBy: { [orderBy]: sort },
    });

    return members.map((member) => new Member(member));
  }

  public async findOne({ id, email, cpf }: FindOneMemberType): Promise<Member | null> {
    if (!id && !email && !cpf) throw new Error('Error: findOne needs at least one key to search');

    const member = await this._prismaService.member.findUnique({ where: { id, email, cpf } });
    if (!member) return member;

    return new Member(member);
  }

  public async update(id: string, payload: UpdateMemberType): Promise<Member> {
    if (payload.email) {
      const memberWithEmail = await this._prismaService.member.findUnique({
        where: { email: payload.email },
      });

      if (memberWithEmail && memberWithEmail.id !== id) throw new MemberAlreadyRegistredException();
    }

    if (payload.cpf) {
      const memberWithCpf = await this._prismaService.member.findUnique({
        where: { cpf: payload.cpf },
      });

      if (memberWithCpf && memberWithCpf.id !== id) throw new MemberAlreadyRegistredException();
    }

    const updateMemberData: Prisma.MemberUpdateInput = {
      cpf: payload.cpf,
      email: payload.email,
      name: payload.name,
      phoneNumber: payload.phoneNumber,
    };

    const updatedMember = await this._prismaService.member.update({
      where: { id },
      data: updateMemberData,
    });

    return new Member(updatedMember);
  }

  public async delete(id: string): Promise<Member> {
    throw new Error('Method not implemented.');
  }
}
