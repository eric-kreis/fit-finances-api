import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class MongoIdDto {
  @ApiProperty({
    description: 'Identificador único (formato MongoDB) - [Referência](https://dev.to/shadowlik/o-que-e-o-campo-id-do-mongodb-e-como-usar-4p5d)',
  })
  @IsMongoId()
  id: string;
}
