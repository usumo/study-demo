const fs = require('fs');
const xlsx = require('node-xlsx').default;
// const mysql = require('mysql');
const express = require('express');
const router = express.Router();
// Parse a buffer
// const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/goods.xlsx`));
// Parse a file
const workSheetsFromFile = xlsx.parse(`${__dirname}/goods.xlsx`);
// console.log(workSheetsFromBuffer);
// console.log(workSheetsFromFile);
const [sheet1, goods, sheet3] = workSheetsFromFile;
const {
	data
} = goods;
const temp = data.map(item => {
	return item.map(item => item.replace(/\s*/g, "")).filter(item => item);
});
const [first, ...result] = temp;
console.log(result);
// const mysqlConfig = {
// 	host: 'qdm195426470.my3w.com',
// 	port: '3306',
// 	database: 'qdm195426470_db',
// 	user: 'qdm195426470',
// 	password: 'wyfnet20180205',
// 	insecureAuth: true
// }


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
	const category = result.map(item => {
		if (item[2] && item[2] != '' && item[3] && item[3] != '') {
			return {
				code: item[2],
				name: item[3],
				remark: '',
				showChildrenFlag: 1,
				skuFlag: 0,
				type: 0,
				pid: '0',
			}
		}
	});
	res.json({
		total: unique(category).length,
		category: unique(category),
	});
});

router.get('/:categoryId/brand', (req, res) => {
	const id = req.params.categoryId;
	const temp = result.filter(item => item[2] == id); //分类
	const brand = temp.map(item => {
		if (item[4] && item[4] != '' && item[5] && item[5] != '') {
			return {
				code: item[4],
				name: item[5],
				remark: '',
				showChildrenFlag: 1,
				skuFlag: 0,
				type: 0,
				pid: '6',
			}
		}
	});
	res.json({
		total: unique(brand).length,
		brand: unique(brand),
	});
});

router.get('/:categoryId/:brandId/goods', (req, res) => {
	const categoryId = req.params.categoryId;
	const brandId = req.params.brandId;
	const temp = result.filter(item => item[2] == categoryId && item[4] == brandId ); //分类
	const goods = temp.map(item => {
		if (item[6] && item[7] != '' && item[6] && item[7] != '') {
			return {
				code: item[6],
				name: item[7],
				remark: '',
				showChildrenFlag: 0,
				skuFlag: 1,
				type: 0,
				pid: '06yz',
				sph: '',
				cyl: '',
				unit: '瓶',
				costPrice: '',
				retailPrice: '',
				discount: 0.8,
				productionLicenseNo: '',
				registrationCertificateNo: '',
			}
		}
	});
	res.json({
		total: goods.length,
		goods,
	});
});

router.get('/wx', (req, res) => {
	console.log(req.query);
	res.send('ok');
});

module.exports = router;