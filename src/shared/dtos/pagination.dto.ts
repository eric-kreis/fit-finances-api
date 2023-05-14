import { DomainSortOrder } from '@domain/enums';
import { PaginationType } from '@domain/types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';

export abstract class PaginationDto<T> implements PaginationType<T> {
  @ApiPropertyOptional({
    description: 'Quantidade de resultados por página',
    default: 10,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @Transform(({ value }) => +value)
  limit: number = 10;

  @ApiPropertyOptional({
    description: 'Número da página',
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @Transform(({ value }) => +value)
  page: number = 0;

  @ApiPropertyOptional({
    description: 'Ordem de ordenação',
    enum: DomainSortOrder,
    default: DomainSortOrder.asc,
  })
  @IsOptional()
  @IsEnum(DomainSortOrder)
  sort: DomainSortOrder = DomainSortOrder.asc;

  abstract orderBy: keyof T;
}
