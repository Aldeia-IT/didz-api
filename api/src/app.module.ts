import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthcheckModule } from './modules/healthcheck/healthcheck.module';
import { DidModule } from './modules/did/did.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HealthcheckModule, DidModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
