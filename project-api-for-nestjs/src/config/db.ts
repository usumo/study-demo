// 本地数据库
const local = {
  mysql: {
    port: 3306,
    host: '127.0.0.1',
    user: 'wyf',
    password: 'vnfjri49..',
    database: 'test', // 库名
    connectionLimit: 10, // 连接限制
  }
}

const db = local;

export default db;