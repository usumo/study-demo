import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, MinLength, MaxLength, Length } from "class-validator";
import { PageDto } from './page.dto';

export class UserSearchDto extends PageDto {
  @ApiProperty({
    required: false,
    description: '姓名'
  })
  name?: string;

  @ApiProperty({
    required: false,
    description: '手机号码'
  })
  phone?: string;
}

export class AddUserDto {
  @ApiProperty({
    required: true,
    description: '活动ID',
    default: '365'
  })
  @IsNotEmpty({ message: '活动ID不能为空' })
  activityId: string;

  @ApiProperty({
    required: true,
    description: '姓名'
  })
  @IsNotEmpty({ message: '姓名不能为空' })
  name: string;

  @ApiProperty({
    required: true,
    description: '手机号码'
  })
  @IsNotEmpty({ message: '手机号码不能为空' })
  phone: string;

  @ApiProperty({
    required: true,
    description: '预约购车时间ID'
  })
  @IsNotEmpty({ message: '购车时间不能为空' })
  levelId: string;

  @ApiProperty({
    required: true,
    description: '车系ID'
  })
  @IsNotEmpty({ message: '车系不能为空' })
  seriesId: string;

  @ApiProperty({
    required: true,
    description: '经销商ID'
  })
  @IsNotEmpty({ message: '经销商不能为空' })
  dealerId: string;

  @ApiProperty({
    required: false,
    description: '性别'
  })
  @Type(() => Number)
  sex: number;

  @ApiProperty({
    required: false,
    description: '省份ID'
  })
  provinceId: string;

  @ApiProperty({
    required: false,
    description: '城市ID'
  })
  cityId: string;

  @ApiProperty({
    required: false,
    description: '试驾时间'
  })
  driveTime: string;
}