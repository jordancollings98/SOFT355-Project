var express = require('express');
var expressRouter = express.Router();

expressRouter.get('/', function(req, res, next) {
  res.send('Future list of users');
});

module.exports = expressRouter;
