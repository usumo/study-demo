const router = require('koa-router')();
const IndexController = require('../controllers/index');


// router.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });
router.post('/login', IndexController.Login);
router.post('/logout', IndexController.logout);
router.get('/currentUser', IndexController.currentUser);
router.get('/menu/list', IndexController.MenuList);
router.get('/wx', (req, res) => {
    console.log(req);
    res.send('ok');
});

module.exports = router;