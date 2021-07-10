var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const formidable = require('formidable');
const fs = require('fs');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/upload', (req, res) => {
  const form = formidable({ multiples: true, uploadDir: path.join(__dirname, 'uploads') });

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    // console.log(files);
    // console.log(files.name);
    // console.log(files.file);
    // res.json(files);
    const oldpath = files.file.path;
    const newname = files.file.name;
    const newpath = path.join(path.dirname(oldpath), newname);
    console.log(files);
    fs.rename(oldpath, newpath, (err) => {
      if (err) throw err;
      res.send({ src: `/img/${newname}` })
    })
  });
});

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