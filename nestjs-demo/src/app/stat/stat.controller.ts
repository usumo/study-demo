import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { StatService } from './stat.service';

@ApiTags('统计')
@Controller('/api/stats')
export class StatController {
  constructor(private readonly statService: StatService) {}

  @ApiOperation({ summary: '每天' })
  @Get('day')
  async statDay() {
    return await this.statService.statDay();
  }

  @ApiOperation({ summary: '每月' })
  @Get('month')
  async statMonth() {
    return await this.statService.statMonth();
  }

  @ApiOperation({ summary: '性别' })
  @Get('sex')
  async statSex() {
    return await this.statService.statSex();
  }

  @ApiOperation({ summary: '省份' })
  @Get('province')
  async statProvince() {
    return await this.statService.statProvince();
  }

  @ApiOperation({ summary: '城市' })
  @Get('city')
  async statCity() {
    return await this.statService.statCity();
  }

  @ApiOperation({ summary: '经销商' })
  @Get('dealer')
  async statDealer() {
    return await this.statService.statDealer();
  }

  @ApiOperation({ summary: '车型' })
  @Get('series')
  async statSeries() {
    return await this.statService.statSeries();
  }
}