import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LoginDto {
  @ApiProperty({
    required: true,
    description: '账号',
    default: 'john'
  })
  @IsNotEmpty({ message: '账号不能为空' })
  username: string;

  @ApiProperty({
    required: true,
    description: '密码',
    default: 'changeme'
  })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}