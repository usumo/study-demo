import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatService } from './stat.service';
import { StatController } from './stat.controller';
import { User } from '../../entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [StatService],
  controllers: [StatController],
  exports: []
})
export class StatModule {}
