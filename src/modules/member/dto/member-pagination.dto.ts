import { Member } from '@domain/member/member';
import { MemberKeys } from '@domain/member/member-keys.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '@shared/dtos/pagination.dto';
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class MemberPaginationDto extends PaginationDto<Member> {
  @ApiPropertyOptional({
    description: 'Chave de referência para ordenação',
    enum: MemberKeys,
    default: MemberKeys.createdAt,
  })
  @IsOptional()
  @IsIn(Object.keys(MemberKeys))
  orderBy: keyof Member = 'createdAt';

  @ApiPropertyOptional({
    description: 'Campo de busca (para email e cpf) para encontrar membros.',
  })
  @IsOptional()
  @IsNotEmpty()
  search?: string;
}
