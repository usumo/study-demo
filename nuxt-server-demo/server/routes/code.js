const express = require('express');
const router = express.Router();
const codeController = require('../controllers/code');

router.get('/captcha', codeController.init);
module.exports = router;
