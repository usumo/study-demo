import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class PageDto {
  @ApiProperty({
    required: true,
    description: '页码'
  })
  @Type(() => Number)
  page: number = 1;

  @ApiProperty({
    required: true,
    description: '页数'
  })
  @Type(() => Number)
  size: number = 10;
}