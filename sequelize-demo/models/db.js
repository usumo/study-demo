const Sequelize = require('sequelize');
const config = require('../config');
/**
 * @param database 数据库名
 * @param user 数据库用户名
 * @param password 数据库连接密码
 */
const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
  // 数据库host
  host: config.db.host,
  // 数据库端口
  port: config.db.port,
  // sequelize支持 mysql、sqlite、postgres、mssql, 选择自己的数据库语言
  dialect: 'mysql',
  pool: {
    max: 90,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    charset: 'utf8',
  }
});
module.exports = sequelize;