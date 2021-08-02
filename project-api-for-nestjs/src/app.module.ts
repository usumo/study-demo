import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatModule } from './app/stat/stat.module';

@Module({
  imports: [
    StatModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
