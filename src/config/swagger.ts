import { DocumentBuilder } from '@nestjs/swagger';

export const documentBuilderConfig = new DocumentBuilder()
  .setTitle('FitFinances API')
  .setVersion('1.0.0')
  .addBearerAuth()
  .build();
