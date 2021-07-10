const Staff = require('../models/staff');
module.exports = {
  async StaffList(req, res) {
    let {
      page,
      size
    } = req.query;
    page = parseInt(page);
    size = parseInt(size);
    if (!Number.isFinite(page)) {
      page = 1;
    }
    if (!Number.isFinite(size)) {
      size = 10;
    }
    await Staff.findAndCountAll({
      raw: true,
      offset: (page - 1) * size,
      limit: size,
    }).then(data => {
      res.json({
        code: '0',
        data,
      });
    }).catch(err => {
      res.json({
        code: '2',
        message: '系统繁忙，请稍后再试~~~',
        desc: err,
      });
    });
  },
  async StaffDetail(req, res) {
    let { id } = req.params;
    if (!id) {
      res.json({
        code: '1',
        message: '参数staffId不正确'
      });
      return;
    }
    await Staff.findAll({
      raw: true, //以对象返回
      // order: [], //排序
      where: { //查询条件
        id,
      },
      // attributes: ['name'], //查询的字段
    }).then(data => {
      res.json({
        code: '0',
        data,
      });
    }).catch(err => {
      res.json({
        code: '2',
        message: '系统繁忙，请稍后再试~~~',
        desc: err,
      });
    });
  }
};