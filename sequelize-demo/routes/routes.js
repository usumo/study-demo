//引入文件
const Index = require('./index');
const API = require('./api');

//api
//路径声明
const app = (app) => {
  app.use('/', Index);
  app.use('/api', API);
}

module.exports = app;