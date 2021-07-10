const fs = require('fs');
const xlsx = require('node-xlsx').default;
// const mysql = require('mysql');
const express = require('express');
const router = express.Router();
// Parse a buffer
// const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/goods.xlsx`));
// Parse a file
const workSheetsFromFile = xlsx.parse(`${__dirname}/chenghua.XLS`);
// console.log(workSheetsFromBuffer);
// console.log(workSheetsFromFile);
const [goods] = workSheetsFromFile;
const {
  data
} = goods;
const [title, ...temp] = data;
console.log(temp);

function unique(data) {
  let existCode = [];
  let existItem = [];
  data.map(item => {
    if (item && !(existCode.includes(item.code))) {
      existCode.push(item.code);
      existItem.push(item);
    }
  });
  return existItem;
}

router.get('/allcategory', (req, res) => {
  // 获取所有类别名字
  const tempCategory = ['镜片', '镜架', '花镜', '太阳镜', '角膜接触镜', '角塑附属产品', '软性隐形眼镜', '斜弱视产品', '斜弱视训练', '眼镜附属产品', '其他商品'];
  // 类别名字去重，组装成json格式
  const category = unique(tempCategory).map((item, index) => {
    return {
      code: index + 1,
      name: item,
      remark: '',
      showChildrenFlag: 1,
      skuFlag: 0,
      type: 0,
      pid: '0',
    }
  });
  res.json({
    total: category.length,
    category,
  });
});

router.get('/:categoryId/brands', (req, res) => {
  const {
    categoryId,
  } = req.params;
  const {
    pid, //新系统的pid
  } = req.query;
  const result = temp.filter(item => item[1].substr(0, 1) === categoryId);
  const brand = result.map(item => {
    const [, code, name, ...rest] = item;
    return {
      code: code.substr(1, 10),
      name,
      remark: '',
      showChildrenFlag: 1,
      skuFlag: 0,
      type: 0,
      pid: pid || `0${categoryId}`,
    }
  });
  res.json({
    total: unique(brand).length,
    brand: unique(brand),
  });
});

router.get('/:categoryId/lens', (req, res) => {
  const {
    categoryId,
  } = req.params;
  const {
    pid, //新系统的pid
  } = req.query;
  const result = temp.filter(item => item[1].substr(0, 1) === categoryId).filter(item => `0${item[1]}` === pid);
  const lens = result.map(item => {
    return {
      code: item[3].substr(item[1].length, 100),
      name: item[4],
      remark: '',
      showChildrenFlag: 0,
      skuFlag: 1,
      type: 0,
      sph: '0',
      cyl: '0',
      unit: '副',
      costPrice: item[6],
      retailPrice: item[5],
      discount: 0.8,
      productionLicenseNo: '',
      registrationCertificateNo: '',
      pid: pid || `0${categoryId}`,
    };
  });
  res.json({
    total: lens.length,
    lens,
  });
});


module.exports = router;