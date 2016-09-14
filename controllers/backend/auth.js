var eventproxy = require('eventproxy');
var validator = require('validator');
var bcrypt = require('bcryptjs');
var uuid = require('node-uuid');

var UserModel = require('../../models').User;

exports.login = function(req, res, next){

	var username = req.body.name && validator.trim(req.body.name) || '';
	var password = req.body.password && validator.trim(req.body.password) || '';
	
	if(!username || !password){
		return res.json({
			success:false,
			msg:'输入信息不完整'
		});
	}	
	
	UserModel.findOne({name: username}, function(err, user){
		if(err){
			return next(err);
		}
		if(!user){
			return res.json({
				success:false,
				msg:'用户名不存在'
			});
		}
		if(user.group !== 'administrator'){
			return res.json({
				success:false,
				msg:'权限不足'				
			});	
		}
		var password_hash = user.password;		
		bcrypt.compare(password, password_hash, function(err, flag){
			if(!flag){
				return res.json({
					success:false,
					msg:'密码不匹配'
				});				
			}else{	
				var token = uuid.v4();		
				user.access_token = token;			
				user.save(function(err, flag){
					if(err){
						return res.json({
							success:false,
							msg:'登陆失败'
						}); 
					}
					user.password = null;
					req.session.user = user;
					req.session.access_token = token;					
					return res.json({
						success:true,
						msg:'登陆成功',
						access_token: token,
						user:user
					}); 
				});
			}
		});

	});
	
}

exports.logout = function(req, res, next){
	
	var user_id = req.session.user && req.session.user._id;	
	var ep = new eventproxy();
	ep.fail(function(){
		return res.json({
			success:true,
			msg:'退出失败'
		});
	})
	ep.all('logout', function(user){
		req.session.user = null;
		req.session.access_token = null;
		return res.json({
			success:true,
			msg:'退出成功'			
		});
	})
	
	UserModel.findOneAndUpdate({_id: user_id}, {access_token: null}, function(err, user){
		if(err) ep.emit('error');
		ep.emit('logout', user);
	});

}