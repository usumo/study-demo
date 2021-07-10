import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entity/user.entity';

@Injectable()
export class StatService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async statDay(): Promise<[User[]]> {
    const sql = 'select DATE_FORMAT(t.order_time,\'%Y-%m-%d\') as date, count(1) as total from test.t_user t group by DATE_FORMAT(t.order_time,\'%Y-%m-%d\') order by DATE_FORMAT(t.order_time,\'%Y-%m-%d\') asc';
    return await this.userRepository.query(sql);
  }

  async statMonth(): Promise<[User[]]> {
    const sql = 'select DATE_FORMAT(t.order_time,\'%Y-%m\') as month, count(1) as total from test.t_user t group by DATE_FORMAT(t.order_time,\'%Y-%m\') order by DATE_FORMAT(t.order_time,\'%Y-%m\') asc';
    return await this.userRepository.query(sql);
  }

  async statSex(): Promise<[User[]]> {
    // const sql = 'select u.sex as sex, count(1) as total from t_user u group by u.sex';
    const sql = 'SELECT s.id AS id, s.name AS name, COUNT(1) AS total FROM t_user u, t_sex s WHERE s.id =u.sex GROUP BY u.sex';
    return await this.userRepository.query(sql);
  }

  async statProvince(): Promise<[User[]]> {
    const sql = 'select u.province_id as provinceId, count(1) as total from t_user u group by u.province_id';
    return await this.userRepository.query(sql);
  }

  async statCity(): Promise<[User[]]> {
    const sql = 'select u.city_id as provinceId, count(1) as total from t_user u group by u.city_id';
    return await this.userRepository.query(sql);
  }

  async statDealer(): Promise<[User[]]> {
    const sql = 'select u.dealer_id as dealerId, count(1) as total from t_user u group by u.dealer_id';
    return await this.userRepository.query(sql);
  }

  async statSeries(): Promise<[User[]]> {
    const sql = 'select u.series_id as seriesId, count(1) as total from t_user u group by u.series_id';
    return await this.userRepository.query(sql);
  }
}
