import helmet from 'helmet';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { documentBuilderConfig } from '@config/swagger';
import { AppModule } from './app.module';
import { PrismaService } from './infrastructure/prisma.service';

const { PORT = 3001 } = process.env;

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule, { bodyParser: true });

  app.enableCors();
  app.use(helmet());

  const swagerDocument = SwaggerModule.createDocument(app, documentBuilderConfig);
  SwaggerModule.setup('docs', app, swagerDocument);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(PORT, () => {
    logger.log(`Server is running on PORT ${PORT} ⛱`, 'NestApplication');
  });
}
bootstrap();
