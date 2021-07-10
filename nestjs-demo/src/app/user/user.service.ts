import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddUserDto, UserSearchDto } from '../../dto/user.dto';
import { User } from '../../entity/user.entity';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User> ) {}

  create(AddUserDto: AddUserDto) {
    const user = new User();
    user.name = AddUserDto.name;
    user.phone = AddUserDto.phone;
    user.sex = AddUserDto.sex;
    return this.userRepository.save(user);
  }

  async findOne(phone: string): Promise<object> {
    return await this.userRepository.find({
      where: {
        phone
      }
    });
  }

  async findAll(opts): Promise<[User[], number]> {
    const { page, size, name, phone } = opts;
    // 自定义sql查询
    const sql = `select * from t_user t order by t.order_time desc limit ${(page -1) * size}, ${size}`;
    return await this.userRepository.manager.query(sql, []);
    // return await this.userRepository.findAndCount();
  }
}