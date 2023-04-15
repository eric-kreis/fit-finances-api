import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class MongoIdDto {
  @ApiProperty({
    description: 'Identificador único (formato MongoDB) - [Referência](https://blog.eduonix.com/web-programming-tutorials/learn-structure-objectid-mongodb/)',
  })
  @IsMongoId()
  id: string;
}
