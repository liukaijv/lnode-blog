var eventproxy = require('eventproxy');
var validator = require('validator');
var bcrypt = require('bcryptjs');

var UserModel = require('../../models').User;

exports.edit = function(req, res, next){
	var id = req.params.id;
	if(!id){
		return res.json({
			success: false,
			msg: '参数不正确'
		});
	}
	UserModel.findOne({_id: id}, '-password' ,function(err, user){
		if(err || !user){
			return res.json({
				success: false,
				msg: '获取用户失败'
			});
		}
		return res.json({
			success: true,
			msg: '获取用户成功',
			user: user			
		});
	})
}

exports.update = function(req, res, next){
	
	var _id = req.params.id;
	if(!_id){
		return res.json({
			success: false,
			msg: '参数不正确'
		});
	}
	
	var email = req.body.email && validator.trim(req.body.email);
	var nickname = req.body.nickname && validator.trim(req.body.nickname);	
	var password = req.body.password && validator.trim(req.body.password);	
	var new_password = req.body.new_password && validator.trim(req.body.new_password);
	var repeat_password = req.body.repeat_password && validator.trim(req.body.repeat_password);

	var ep = new eventproxy();

	ep.fail(function(msg){
		return res.json({
			success:false,
			msg:msg
		});
	});	

	ep.all('resolve_pwd', function(password){
		var data = {};
		if(password){
			data.email = email;
			data.nickname = nickname;
			data.password = password;
		}else{
			data.email = email;
			data.nickname = nickname;
		}
		UserModel.findOneAndUpdate({_id: _id}, data, function(error, user){			
			if(error) ep.emit('error', '修改失败');	
			if(req.session.user && req.session.user._id == _id){
				return res.json({
					success:true,
					msg:'修改成功',
					logout: true
				});	
			}	
			return res.json({
				success:true,
				msg:'修改成功'
			});	
		});
	});	
	
	UserModel.findOne({_id: _id}, function(err, user){
		if(err || !user){
			ep.emit('error', '修改的用户不存在');			
		}
		if(password){			
			if(!new_password || new_password.length == 0){
				ep.emit('error', '新密码不能为空');
			}
			if(repeat_password != new_password){
				ep.emit('error', '两次密码不一致');
			}			
			bcrypt.compare(password, user.password, function(err, flag){
				if(!flag){
					ep.emit('error', '原密码不正确');		
				}else{	
					bcrypt.hash(new_password, 10, function(err, hash){
						if(err) ep.emit('error', '生成新密码失败');					
						ep.emit('resolve_pwd', hash);	
					});					
				}
			});
		}else{
			ep.emit('resolve_pwd', '');
		}			
	});
	
}