import { HttpExceptionHandler } from '@/infra/ExceptionHandler';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { PrismaService } from '@/prisma/services/prisma.service';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const prismaService: PrismaService = app.get(PrismaService);

  prismaService.enableShutdownHooks(app);

  app.useGlobalFilters(new HttpExceptionHandler());
  const port = configService.get('server.port');
  await app.listen(port);
}
bootstrap();
