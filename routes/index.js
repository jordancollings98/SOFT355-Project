var express = require('express');
var expressRouter = express.Router();
var passport = require('passport');
var path = require('path');
var userSchema = require('../models/userSchema');
var noteSchema = require('../models/noteSchema')

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
    res.render('register', {});
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

expressRouter.get('/notes', function(req, res) {
  res.render('notes', {});
});

expressRouter.get('/getNotes', function(req, res) {
  noteSchema.find({}, function(err, docs){
    if (!err){
      console.log(docs);
    }
    var noteMap = {};

    docs.forEach(function(note){
      noteMap[note._id] = note;
    });
    res.send(noteMap);
  });
    //res.render('notes', {});
});

expressRouter.post('/notes', function(req,res){
var note = new noteSchema({ title : req.body.title, message : req.body.message});
note.save(function (err,note) {
	if (err) {
		return res.render('notes',{noteSchema : noteSchema});
	};
});
console.log("\x1b[32m","Note with title: " + note.title + " has been saved.");
res.redirect('/notes');
});

module.exports = expressRouter;
