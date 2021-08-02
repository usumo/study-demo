import { Controller, Get } from '@nestjs/common';
import { StatService } from './stat.service';

@Controller('/api/stat')
export class StatController {

  constructor(private readonly statService: StatService) {}

  @Get('day')
  statDay() {
    return this.statService.statDay();
  }
}
