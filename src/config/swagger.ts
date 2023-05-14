import { DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';

const apiDescription = fs.readFileSync('./src/config/api_description.md').toString();

export const documentBuilderConfig = new DocumentBuilder()
  .setTitle('FitFinances API')
  .setDescription(apiDescription)
  .setVersion('1.0.0')
  .addBearerAuth()
  .build();
