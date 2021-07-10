//同步表结构
const Staff = require('../models/staff');
Staff.sync({
  force: true // 强制同步，先删除表，然后新建
}).then(res => {
  console.log('init staff table is ok');
}).catch(err => {
  console.log('err' + err);
});