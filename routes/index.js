var express = require('express');
var expressRouter = express.Router();
var passport = require('passport');
var path = require('path');
var userSchema = require('../models/userSchema');


/* ROUTER TEST*/
expressRouter.get('/router-test', function(req, res){
    res.status(200).send("Test Message");
});
/* ROUTER TEST*/

/* Main GET + Post Requests*/
expressRouter.get('/', function(req, res, next) {
  res.render('index.html', {});
});

expressRouter.get('/register', function(req, res) {
    res.render('register', { });
});

expressRouter.post('/register', function(req, res) {
    userSchema.register(new userSchema({ username : req.body.username }), req.body.password, function(err, userSchema) {
        if (err) {
            return res.render('register', { userSchema : userSchema });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

expressRouter.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

expressRouter.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

expressRouter.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = expressRouter;
