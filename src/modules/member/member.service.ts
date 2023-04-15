import { Member } from '@domain/member/member';
import { Injectable } from '@nestjs/common';
import { MemberRepository } from '@domain/member/member.repository';
import { MemberService as DomainMemberService } from '@domain/member/member.service';
import { MemberNotFoundException } from '@domain/member/exceptions/member-not-found.exception';
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
    return this._memberRepository.findMany(query);
  }

  public async findById(id: string): Promise<Member> {
    const member = await this._memberRepository.findOne({ id });
    if (!member) throw new MemberNotFoundException();
    return member;
  }

  public async findByCpf(cpf: string): Promise<Member> {
    const member = await this._memberRepository.findOne({ cpf });
    if (!member) throw new MemberNotFoundException();
    return member;
  }

  public async findByEmail(email: string): Promise<Member> {
    const member = await this._memberRepository.findOne({ email });
    if (!member) throw new MemberNotFoundException();
    return member;
  }

  public async update(id: string, paylaod: UpdateMemberDto): Promise<Member> {
    const member = await this._memberRepository.findOne({ id });
    if (!member) throw new MemberNotFoundException();

    return this._memberRepository.update(id, paylaod);
  }

  public async delete(id: string): Promise<Member> {
    throw new Error('Method not implemented.');
  }
}
