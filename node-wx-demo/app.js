const fs = require('fs');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// const logger = require('morgan');
const xmlparser = require('express-xml-bodyparser');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);

const router = require('./routes/routes');

const app = express();

const redisClient = redis.createClient({
  host: '127.0.0.1',
  port: 6379,
});


// const proxy = require('./proxy');
// proxy(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser('1234567890qwert@'));
app.use(xmlparser({
  explicitArray: false, //是否为数组
  normalize: false,
  normalizeTags: false, //字段名是否全为小写
  trim: true,
}));

//开启session
app.use(session({
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: 5 * 60 * 1000
  },
  secret: '1234567890qwert@',
  name: 'test_session_id',
  saveUninitialized: false,
  resave: false,
  store: new RedisStore({ client: redisClient })
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'public/wx')));

//路由转发
router(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;