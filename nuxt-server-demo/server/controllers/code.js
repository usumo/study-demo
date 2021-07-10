const captcha = require('trek-captcha');
const md5 = require('md5');
const CodeController = {
  init: async (req, res, next) => {
    const {
      token,
      buffer,
    } = await captcha();
    req.session || (req.session = {});
    req.session.captcha = md5(token);
    res.type('gif');
    res.end(buffer);
  },
};
module.exports = CodeController;
