var mongoose = require('mongoose');
var config   = require('../config');
var logger = require('../utils/logger')

// connect db
var dbConnect = mongoose.connect(config.db, {
  server: {poolSize: 20}
}, function (err) {
  if (err) {   	
  	logger.error('connect to %s error: ', config.db, err.message);
    process.exit(1);
  }
});

// models
require('./user');
require('./category');
require('./tag');
require('./post');

exports.dbConnect = dbConnect;
exports.User = mongoose.model('User');
exports.Category = mongoose.model('Category');
exports.Tag = mongoose.model('Tag');
exports.Post = mongoose.model('Post');
