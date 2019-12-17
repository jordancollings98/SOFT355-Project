var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport')
var logger = require('morgan');;
var localStrategy = require('passport-local').Strategy;
var path = require('path');
var cookieParser = require('cookie-parser');
var createError = require('http-errors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var myApp = express();

myApp.set('views', path.join(__dirname, 'views'));
myApp.set('view engine', 'jade');

myApp.use(logger('dev'));
myApp.use(express.json());
myApp.use(express.urlencoded({ extended: false }));
myApp.use(cookieParser());
myApp.use(require('express-session')({
    secret: 'orange lemon',
    resave: false,
    saveUninitialized: false
}));
myApp.use(passport.initialize());
myApp.use(passport.session());
myApp.use(express.static(path.join(__dirname, 'public')));

myApp.use('/', indexRouter);
myApp.use('/users', usersRouter);

var userSchema = require("./models/userSchema");
passport.use(new localStrategy(userSchema.authenticate()));
passport.serializeUser(userSchema.serializeUser());
passport.deserializeUser(userSchema.deserializeUser());

var uri = "mongodb+srv://jcollings2:plymouthuniversity@uni-exercise5-ezjhs.mongodb.net/userDb?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true});


myApp.use(function(req, res, next) {     // Catch 404 errors and forward to the error handler
  var err = new Error('Not Found');
    err.status = 404;
    next(err);;
});

if (myApp.get('env') === 'development') {    // Errors to development environment
    myApp.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


myApp.use(function(err, req, res, next) {     // Error handling function
 
  res.locals.message = err.message;
  res.locals.error = req.myApp.get('env') === 'development' ? err : {};  // Errors to development environment

 
  res.status(err.status || 500);     
  res.render('error');         // render 500 error
});

module.exports = myApp;
