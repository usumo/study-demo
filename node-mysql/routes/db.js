const mysql = require('mysql');
let mysqlConfig = {
  host: 'localhost',
  port: '3306',
  database: 'test',
  user: 'wyf',
  password: 'vnfjri49..',
  insecureAuth: true,
  connectTimeout: 10000
};

module.exports = sql => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig);
    connection.connect();
    connection.query(sql, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
    connection.end();
  });
}