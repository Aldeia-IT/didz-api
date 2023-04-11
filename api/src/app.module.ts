import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthcheckModule } from './modules/healthcheck/healthcheck.module';
import { DidModule } from './modules/did/did.module';

@Module({
  imports: [HealthcheckModule, DidModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
