import { Module } from '@nestjs/common';
import { StatController } from './stat.controller';
import { StatService } from './stat.service';

@Module({
  providers: [StatService],
  controllers: [StatController]
})
export class StatModule {}
