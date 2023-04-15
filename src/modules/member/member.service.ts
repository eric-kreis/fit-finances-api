import { Member } from '@domain/member/member';
import { MemberRepository } from '@domain/member/member.repository';
import { MemberService as DomainMemberService } from '@domain/member/member.service';
import { CreateMemberType } from '@domain/member/member.types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MemberService extends DomainMemberService {
  constructor(
    private readonly _memberRepository: MemberRepository,
  ) {
    super();
  }

  public async create(data: CreateMemberType): Promise<Member> {
    throw new Error('Method not implemented.');
  }

  public async findById(id: string): Promise<Member> {
    throw new Error('Method not implemented.');
  }

  public async findByCpf(cpf: string): Promise<Member> {
    throw new Error('Method not implemented.');
  }

  public async findByEmail(email: string): Promise<Member> {
    throw new Error('Method not implemented.');
  }

  public async update(id: string, paylaod: Partial<CreateMemberType>): Promise<Member> {
    throw new Error('Method not implemented.');
  }

  public async delete(id: string): Promise<Member> {
    throw new Error('Method not implemented.');
  }
}
