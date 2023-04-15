import { Member } from '@domain/member/member';
import { MemberPaginationType } from '@domain/member/member.types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '@shared/dtos/pagination.dto';
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class MemberPaginationDto extends PaginationDto<Member> implements MemberPaginationType {
  @ApiPropertyOptional({
    enum: Object.keys(Member.prototype),
    enumName: 'MemberKeys',
    default: 'createdAt',
  })
  @IsOptional()
  @IsIn(Object.keys(Member.prototype))
  orderBy: keyof Member = 'createdAt';

  @IsOptional()
  @IsNotEmpty()
  search?: string;
}
