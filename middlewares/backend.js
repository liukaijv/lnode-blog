var UserModel  = require('../models').User;
var eventproxy = require('eventproxy');
var validator = require('validator');

exports.admin_required = function(req, res, next){
	var ep = new eventproxy();
	ep.fail(next);

	var access_token = String(req.body.access_token || req.query.access_token || req.headers.access_token || '');
	access_token = validator.trim(access_token);

	UserModel.findOne({access_token: access_token}, ep.done(function (user) {		
		if (!user) {
			res.status(401);
			return res.json({success: false, msg: '错误的access_token'});
		}
		if (user.group != 'administrator') {
			res.status(403);
			return res.send({success: false, msg: '你没有权限'});
		}
		req.user = user;
		next();
	}));

}