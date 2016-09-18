var eventproxy = require('eventproxy');
var validator = require('validator');
var config = require('../../config');

var TagModel = require('../../models').Tag;

// 列表
exports.index = function(req, res, next){

	var page_size = req.query.page_size && parseInt(req.query.page_size) || config.backend_list_size;
	var page = req.query.page && parseInt(req.query.page) || 1;

	if(!page || !page_size){
		return res.json({
			success: false,
			msg: '参数错误'
		});
	}	

	var ep = new eventproxy();
	ep.fail(next);

	ep.all('get_tags', 'tag_count', function(tags, total){
		return res.json({
			success: true,
			msg: '获取标签成功',
			tags: tags,
			count:total.count,
			total_page:total.total_page,
			page:page,
			page_size:page_size
		});
	});

	var opt = {
		skip: (page-1) * page_size,
		limit: page_size,
		sort: '-created_at'
	}	

	TagModel.count(function(err, count){
		if(err){
			return res.json({
				success: false,
				msg: '获取统计失败'
			});
		}
		var total_page = Math.ceil(count/page_size);
		ep.emit('tag_count', {total_page:total_page,count:count});		
	})

	TagModel.find({}, {}, opt, function(err, tags){
		if(err){
			return res.json({
				success: false,
				msg: '获取数据失败'
			});
		}
		ep.emit('get_tags', tags);		
	})
	
}

exports.store = function(req, res, next){

	var name = req.body.name && validator.trim(req.body.name);	

	var ep = new eventproxy();
	ep.fail(next);

	ep.on('invalid',function(msg){
		return res.json({
			success: false,
			msg: msg
		});
	});

	if(!name || name.length == 0){
		return ep.emit('invalid', '标签名不能为空');		
	}	

	TagModel.find({name:name}, function(err, tag){

		if(err || tag.length > 0){
			return ep.emit('invalid', '标签名已存在');	
		}

		TagModel.create({
			name:name			
		}, function(err, tag){
			if(err){
				return res.json({
					success: false,
					msg: '添加失败'
				});
			}
			return res.json({
				success: true,
				msg: '添加成功',
				tag: tag	
			});
		});

	});
	
}

exports.edit = function(req, res, next){
	var id = req.params.id;
	if(!id){
		return res.json({
			success: false,
			msg: '参数不正确'
		});
	}
	TagModel.findOne({_id: id},function(err, tag){
		if(err || !tag){
			return res.json({
				success: false,
				msg: '获取标签失败'
			});
		}
		return res.json({
			success: true,
			msg: '获取标签成功',
			tag: tag			
		});
	})
}

exports.update = function(req, res, next){
	var id = req.params.id;
	if(!id){
		return res.json({
			success: false,
			msg: '参数不正确'
		});
	}
	var name = req.body.name && validator.trim(req.body.name);	

	var ep = new eventproxy();
	ep.fail(next);

	ep.on('invalid',function(msg){
		return res.json({
			success: false,
			msg: msg
		});
	});

	if(!name || name.length == 0){
		return ep.emit('invalid', '分类名不能为空');		
	}	

	TagModel.findOneAndUpdate({_id: id}, {
		name: name
	},function(err, tag){
		if(err){
			return res.json({
				success: false,
				msg: '更新失败'
			});
		}
		return res.json({
			success: true,
			msg: '更新成功',
			tag: tag
		});
	});	
	
}

exports.delete = function(req, res, next){
	var id = req.params.id;
	if(!id){
		return res.json({
			success: false,
			msg: '参数不正确'
		});
	}
	TagModel.findOneAndRemove({_id: id}, function(err, flag){
		if(err){
			return res.json({
				success: false,
				msg: '删除失败'
			});
		}
		return res.json({
			success: true,
			msg: '删除成功'
		});
	});

}

// 批量删除
exports.deleteBatch = function(req, res, next){
	var ids = req.body.ids && req.body.ids.split(',');
	if(!ids && !Array.isArray(ids)){
		return res.json({
			success: false,
			msg: '参数不正确'
		});
	}	
	TagModel.remove({_id: {$in: ids}}, function(err, flag){
		if(err){
			return res.json({
				success: false,
				msg: '删除失败'
			});
		}
		return res.json({
			success: true,
			msg: '删除成功'
		});
	});

}
