import { PaginationType } from '@domain/types';
import { Member } from './member';

export type CreateMemberType = Omit<Member, 'id' | 'createdAt' | 'updatedAt' | 'phoneNumber'> & {
  phoneNumber?: string | null;
};

export type UpdateMemberType = Partial<CreateMemberType>;

export type MemberPaginationType = PaginationType<Member> & {
  search?: string;
};

export type FindOneMemberType = {
  id?: string;
  email?: string;
  cpf?: string;
};
