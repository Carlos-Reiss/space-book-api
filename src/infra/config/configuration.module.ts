import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import configuration from './configuration';

const ConfigModuleExports = NestConfigModule.forRoot({
  isGlobal: true,
  load: [configuration],
});

@Global()
@Module({
  imports: [ConfigModuleExports],
  exports: [ConfigModuleExports],
})
export class ConfigurationModule {}
