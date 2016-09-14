var eventproxy = require('eventproxy');
var User = require('../models').User;

exports.getUserById = function(id, callback){
	User.findOne({_id: id}, callback)
}

exports.getUserByName = function(name, callback){
	User.findOne({name: name}, callback)
}

exports.getUserByToken = function(access_token, callback){
	User.findOne({access_token: access_token}, callback)
}