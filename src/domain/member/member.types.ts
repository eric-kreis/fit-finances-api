import { PaginationType } from '@domain/types';
import { Member } from './member';

export type CreateMemberType = Omit<Member, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateMemberType = Partial<CreateMemberType>;

export type MemberPaginationType = PaginationType<Member> & {
  serach?: string;
};

export type FindOneMemberType = {
  id?: string;
  email?: string;
  cpf?: string;
};
