// const fs = require('fs');
// const path = require('path');
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  req.session.test = '123456';
  res.cookie('_token', '123456', {
    path: '/',
    httpOnly: false,
    secure: false,
    maxAge: 5 * 60 * 1000
  });
  res.render('index');
});
// router.get('/static/*', (req, res) => {
// const html = fs.readFileSync(path.resolve(__dirname, '../public/wx/index.html'), 'utf-8')
// res.send(html);
// });

module.exports = router;