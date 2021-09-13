import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionHandler } from './infra/ExceptionHandler/index';
import { PrismaService } from './prisma/services/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prismaService: PrismaService = app.get(PrismaService);

  prismaService.enableShutdownHooks(app);

  app.useGlobalFilters(new HttpExceptionHandler());

  await app.listen(3030);
}
bootstrap();
