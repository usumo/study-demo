import { Controller, Get, Param, Query, Post, Body, Delete, Put, UsePipes, HttpStatus, HttpCode } from '@nestjs/common';
import { UserSearchDto, AddUserDto } from '../../dto/user.dto';
import { UserService } from './user.service';
import { ValidationPipe } from '../../pipe/validation.pipe';
import { ApiBody, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../../entity/user.entity';

@ApiTags('用户')
@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '创建用户' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() user: AddUserDto): Promise<object> {
    try {
      await this.userService.create(user);
      return {
        code: 0,
        msg: 'success'
      }
    } catch (err) {
      return {
        code: 1,
        msg: 'success',
        data: err
      }
    }
  }

  @ApiOperation({ summary: '删除用户' })
  @Delete(':id')
  async delete(@Param('id') id): Promise<object> {
    return {
      id,
      msg: 'success'
    }
  }

  @ApiOperation({ summary: '更新用户' })
  @Put(':id')
  async update(@Param('id') id): Promise<object> {
    return {
      id,
      msg: 'success'
    }
  }

  @ApiOperation({ summary: '用户详情' })
  @Get(':id')
  // @ApiResponse({status: 200, description: 'success', type: User})
  async query(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @ApiOperation({ summary: '用户搜索' })
  @Get()
  async findAll(@Query() userSearchDto: UserSearchDto): Promise<object> {
    return await this.userService.findAll(userSearchDto);
  }
}