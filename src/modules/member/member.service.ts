import { Member } from '@domain/member/member';
import { MemberRepository } from '@domain/member/member.repository';
import { MemberService as DomainMemberService } from '@domain/member/member.service';
import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MemberPaginationDto } from './dto/member-pagination.dto';

@Injectable()
export class MemberService extends DomainMemberService {
  constructor(
    private readonly _memberRepository: MemberRepository,
  ) {
    super();
  }

  public async create(data: CreateMemberDto): Promise<Member> {
    return this._memberRepository.create(data);
  }

  public async findMany(query: MemberPaginationDto): Promise<Member[]> {
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

  public async update(id: string, paylaod: UpdateMemberDto): Promise<Member> {
    throw new Error('Method not implemented.');
  }

  public async delete(id: string): Promise<Member> {
    throw new Error('Method not implemented.');
  }
}
