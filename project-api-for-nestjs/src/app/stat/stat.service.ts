import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize';
import sequelize from '../../db/sequelize';

@Injectable()
export class StatService {
  async statDay() {
    const sql = 'select DATE_FORMAT(t.order_time,\'%Y-%m-%d\') as date, count(1) as total from test.t_user t group by DATE_FORMAT(t.order_time,\'%Y-%m-%d\') order by DATE_FORMAT(t.order_time,\'%Y-%m-%d\') asc';
    return await sequelize.query(sql, {
      type: Sequelize.QueryTypes.SELECT, // 查询方式
      raw: true, // 是否使用数组组装的方式展示结果
      // logging: true, // 是否将 SQL 语句打印到控制台，默认为 true
    })
  }
}