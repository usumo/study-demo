const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const rp = require('request-promise');


const decrypt = require('./public/test/rsa/decrypt');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use('/rsa', decrypt);

app.use('/api/test', function (req, res) {
  console.log('/api/test');

  let url = 'http://music.migu.cn/music-migu-web/migumusic/user/571622ad-73c8-4507-87d2-44b644b2f7a3/playlists?listType=0&pageSize=50&pageNo=1';

  rp({
    method: 'GET',
    uri: url,
    // qs: {
    //   listType: 0,
    //   pageSize: 50,
    //   pageNo: 1
    // },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true,
    timeout: 10000
  }).then(function (response) {
    res.json(response);
  }).catch(function (err) {
    console.error(err);
  });

});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;