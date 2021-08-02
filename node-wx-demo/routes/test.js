const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  req.session.touch();
  // req.session.cookie.maxAge = 60 * 60 * 1000;
  // res.cookie('_token', '123456', {
  //   path: '/',
  //   httpOnly: false,
  //   secure: false,
  //   maxAge: 30 * 60 * 1000
  // });
  res.send('ok');
});


module.exports = router;