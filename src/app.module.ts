import { AuthModule } from '@/modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './infra/config/configuration.module';
import { HttpExceptionHandler } from './infra/ExceptionHandler/index';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { UsersModule } from './modules/users/users.module';
import { PrismaService } from './prisma/services/prisma.service';

@Module({
  imports: [UsersModule, ConfigurationModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionHandler,
    },
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
