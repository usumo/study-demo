const fs = require('fs');
const xlsx = require('node-xlsx').default;
const express = require('express');
const router = express.Router();
const db = require('./db');

const workSheetsFromFile = xlsx.parse(`${__dirname}/data.xlsx`);

const [{ data }] = workSheetsFromFile;
const [title, ...rest] = data;
console.log(rest);
// const id = '04cabdd7-338e-4bf7-8638-5aa81d7e1d32';
// const sql = `select activity_id from migu_toyota where status = '0' and id='${id}'`;

for (let i = 600; i <= 700; i++) {
  const item = rest[i];
  const uuid = item[0];
  const name = item[1];
  const phone = item[2];
  const id = item[3];
  const sql = `select activity_id from migu_toyota where status = '0' and phone='${phone}'`;
  db(sql).then(res => {
    const [{ activity_id }] = res;
    console.log(`${uuid}-${name}-${phone}--->客户提供的活动ID：${id}，自己库存的活动ID：${activity_id}，${id == activity_id}`);
  }).catch(err => {
    console.log('没查到的手机号码=============》' + phone);
  });
}

router.get('/toyota', (req, res) => {
  console.log(req.query);
  res.send('ok');
});

module.exports = router;