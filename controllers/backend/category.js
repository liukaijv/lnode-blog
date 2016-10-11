var eventproxy = require('eventproxy');
var validator = require('validator');

var config = require('../../config');
var str_slug = require('../../utils').str_slug;

var CategoryModel = require('../../models').Category;

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

	ep.all('getCategories', 'categoryCount', function(categories, total){
		return res.json({
			success: true,
			msg: '获取分类成功',
			categories: categories,
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

	CategoryModel.count(function(err, count){
		if(err){
			return res.json({
				success: false,
				msg: '分类统计失败'
			});
		}
		var total_page = Math.ceil(count/page_size);
		ep.emit('categoryCount', {total_page:total_page,count:count});		
	})

	CategoryModel.find({}, {}, opt).populate('parent', 'name').exec(function(err, categories){
		if(err){
			return res.json({
				success: false,
				msg: '获取分类失败'
			});
		}		
		ep.emit('getCategories', categories);		
	})
	
}

exports.create = function(req, res, next){

	CategoryModel.find({parent: null}, function(err, categories){
		if(err){
			return res.json({
				success: false,
				msg: '获取分类失败'
			});
		}
		return res.json({
			success: true,
			msg: '获取分类成功',
			categories: categories			
		});
	})

}

exports.store = function(req, res, next){

	var name = req.body.name && validator.trim(req.body.name);
	var slug = req.body.slug && validator.trim(req.body.slug);	
	var description = req.body.description && validator.trim(req.body.description);	
	var parent = req.body.parent && validator.trim(req.body.parent);
	var is_nav = req.body.is_nav && Boolean(req.body.is_nav) || false;		

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

	if(parent && !validator.isMongoId(parent)){
		return ep.emit('invalid', '父级分类不正确');
	}

	slug = slug ? slug : str_slug(name);

	CategoryModel.find({name:name}, function(err, category){

		if(err || category.length > 0){
			return ep.emit('invalid', '分类名已存在');	
		}

		CategoryModel.create({
			name:name,
			slug:slug,
			description: description,
			parent: parent?parent:null,
			is_nav: is_nav
		}, function(err, category){
			if(err){
				return res.json({
					success: false,
					msg: '添加失败'
				});
			}
			return res.json({
				success: true,
				msg: '添加成功',
				category: category	
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
	var ep = new eventproxy();
	ep.fail(next);

	ep.all('category', 'categories', function(category, categories){
		return res.json({
			success: true,
			msg: '获取分类成功',
			categories: categories,		
			category: category
		});
	});

	CategoryModel.findOne({_id: id}, function(err, category){
		if(err || !category){
			return res.json({
				success: false,
				msg: '获取分类失败'
			});
		}	
		ep.emit('category', category)
	});

	CategoryModel.find({_id: {$ne: id}, parent: null},function(err, categories){
		if(err){
			return res.json({
				success: false,
				msg: '获取分类失败'
			});
		}		
		ep.emit('categories', categories)
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
	var slug = req.body.slug && validator.trim(req.body.slug);	
	var description = req.body.description && validator.trim(req.body.description);	
	var parent = req.body.parent && validator.trim(req.body.parent);
	var is_nav = req.body.is_nav && Boolean(req.body.is_nav) || false;	

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

	if(parent && !validator.isMongoId(parent)){
		return ep.emit('invalid', '父级分类不正确');
	}

	slug = slug ? slug : str_slug(name);

	CategoryModel.findOneAndUpdate({_id: id}, {
		name: name,
		slug: slug,
		description: description,
		parent: parent ? parent: null,
		is_nav: is_nav
	},function(err, category){
		if(err){
			return res.json({
				success: false,
				msg: '更新失败',
				err: err
			});
		}		
		return res.json({
			success: true,
			msg: '更新成功',
			category: category	
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
	CategoryModel.findOneAndRemove({_id: id}, function(err, flag){
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
	CategoryModel.remove({_id: {$in: ids}}, function(err, flag){
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
