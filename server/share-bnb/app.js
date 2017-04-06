var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require("mongoose");
const passport = require("passport");
const bcrypt = require("bcrypt");
const cors         = require('cors')();
// const multer = require("multer");
var requestify = require('requestify');

var index = require('./routes/index');
var users = require('./routes/users');
var auth = require("./routes/auth");

//----------REQUIRE THE DATABASE-------------
require('./config/database');
var app = express();


app.use(cors);
app.options('*', cors);

// var corsOptions = {credentials: true, origin: 'http://localhost:4200'};
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



//Passport
app.use(passport.initialize());
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', auth);
app.use('/', index, auth);
app.use('/users', users);
// app.use('/profile', users);

// Authenticated User Goes to Home
// app.use('/api/home', passport.authenticate('jwt', { session: false }), users);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

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
