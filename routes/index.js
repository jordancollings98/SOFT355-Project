var mongoose = require('mongoose');
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
/* END ROUTER TEST*/

/* Main GET + Post Requests*/
expressRouter.get('/', function(req, res, next) {
  res.render('index.html', {});
});

expressRouter.get('/register', function(req, res) {
    res.render('register', {});
});

expressRouter.post('/register', function(req, res) { // POST data from /register page of username and password using passport register
    userSchema.register(new userSchema({ username : req.body.username }), req.body.password, function(err, userSchema) {
        if (err) {
            return res.render('register', { userSchema : userSchema });
        }

        passport.authenticate('local')(req, res, function () { // Authenticate with passport
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
  noteSchema.find({}, function(err, notes){ // Find all notes

   var noteMap = {};

	if (err){
		throw err;
			console.log("Error while finding notes");// log error to console if found
	}else if (!err){
			console.log("Notes Found");
	}

    notes.forEach(function(note){
      noteMap[note._id] = note; // Find each note byId and add to the noteMap array
    });
    res.send(noteMap); //Send all notes after for each function to /getNotes
  });
});

expressRouter.post('/notes', function(req, res){

var note = new noteSchema({ title : req.body.title, message : req.body.message}); // Create new note based on user input

note.save(function (err,note) { // save note to database
	if (err) {
		return res.render('notes',{noteSchema : noteSchema}); // If error occurs render error on page
	};
});
console.log("\x1b[32m","Note with title: " + note.title + " has been saved."); // Log newly created note in console
res.redirect('/notes');
});

expressRouter.post('/updateNotes', function (req, res){
  var singleNote = {
    title: req.body.title,
    message: req.body.message
  };
  var id = req.body.id;

  noteSchema.findByIdAndUpdate(id, {$set: singleNote}, function (err, note){
    if (err){
      console.log("Error while updating note" + id);
    };

    });
    console.log("\x1b[33m","Note with ID: " + id + " has been updated."); // Log newly created note in console
    res.redirect('/notes');
  });

  expressRouter.post('/deleteNotes', function (req, res){

    var id = req.body.id;

    noteSchema.findByIdAndDelete(id, function (err, note){
      if (err){
        console.log("Error while deleting note" + id);
      };

      });
      console.log("\x1b[31m","Note with ID: " + id + " has been deleted."); // Log newly created note in console
      res.redirect('/notes');
    });

module.exports = expressRouter;
