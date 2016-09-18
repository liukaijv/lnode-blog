var eventproxy = require('eventproxy');
var validator = require('validator');
var MarkdownIt = require('markdown-it');
var config = require('../../config');

var PostModel = require('../../models').Post;
var TagModel = require('../../models').Tag;

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

	ep.all('getPosts', 'postCount', function(posts, total){
		return res.json({
			success: true,
			msg: '获取文章成功',
			posts: posts,
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

	PostModel.count(function(err, count){
		if(err){
			return res.json({
				success: false,
				msg: '文章统计失败'
			});
		}
		var total_page = Math.ceil(count/page_size);
		ep.emit('postCount', {total_page:total_page,count:count});		
	})

	PostModel.find({}, '-tags', opt).populate('category', 'name').exec(function(err, posts){
		if(err || posts.length < 1){
			return res.json({
				success: false,
				msg: '获取文章失败'
			});
		}		
		ep.emit('getPosts', posts);		
	})
}

exports.create = function(req, res, next){

	TagModel.find({}, '_id name', function(err, tags){
		if(err){
			return res.json({
				success: false,
				msg: '获取标签失败'
			});
		}
		return res.json({
			success: true,
			msg: '获取标签成功',
			tags: tags			
		});
	})

}

exports.store = function(req, res, next){

	var title = req.body.title && validator.trim(req.body.title);	
	var summary = req.body.description && validator.trim(req.body.summary);	
	var content = req.body.content && validator.trim(req.body.content);	
	var content_raw = '';	
	var is_markdown = req.body.is_markdown && Boolean(req.body.is_markdown) || false;	
	var category = req.body.category && validator.trim(req.body.category);
	var user = req.session.user;
	var tags = req.body.tags || [];
	var status = req.body.status && validator.trim(req.body.status);
	var author = req.body.author && validator.trim(req.body.author);
	var is_hidden = req.body.is_hidden && Boolean(req.body.is_hidden) || false;	
	var allow_comment = req.body.allow_comment && Boolean(req.body.allow_comment) || true;	
	var allow_feed = req.body.allow_feed && Boolean(req.body.allow_feed) || true;	

	var ep = new eventproxy();
	ep.fail(next);

	ep.on('invalid',function(msg){
		return res.json({
			success: false,
			msg: msg
		});
	});	

	if(!title || title.length == 0){
		return ep.emit('invalid', '文章标题不能为空');		
	}

	if(!category || category.length == 0){
		return ep.emit('invalid', '请选择分类');		
	}

	if(category && !validator.isMongoId(category)){
		return ep.emit('invalid', '父级分类不正确');
	}

	if(!content || content.length == 0){
		return ep.emit('invalid', '文章内容不能为空');		
	}

	if(is_markdown){
		var md = new MarkdownIt();
		content_raw = content;
		content = md.render(content);		
	}	

	PostModel.find({title: title}, function(err, post){

		if(err || post.length > 0){
			return ep.emit('invalid', '文章标题已存在');	
		}

		PostModel.create({
			title:title,		
			summary: summary,
			content: content,
			content_raw: content_raw,
			category: category,
			user: user,
			author: author || user.nickname || user.name || '',			
			tags: tags,
			status: status,
			is_hidden: is_hidden,
			allow_comment: allow_comment,
			allow_feed: allow_feed
		}, function(err, post){			
			if(err){
				return res.json({
					success: false,
					msg: '添加失败'
				});
			}
			return res.json({
				success: true,
				msg: '添加成功',
				post: post	
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

	ep.all('post', 'tags', function(post, tags){
		return res.json({
			success: true,
			msg: '获取文章成功',
			tags: tags,		
			post: post
		});
	});

	PostModel.findOne({_id: id}, function(err, post){
		if(err || !post){
			return res.json({
				success: false,
				msg: '获取文章失败'
			});
		}	
		ep.emit('post', post)
	});

	TagModel.find({_id: {$ne: id}}, 'name', function(err, tags){
		if(err){
			return res.json({
				success: false,
				msg: '获取标签失败'
			});
		}		
		ep.emit('tags', tags)
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
	var title = req.body.title && validator.trim(req.body.title);	
	var summary = req.body.description && validator.trim(req.body.summary);		
	var content = req.body.content && validator.trim(req.body.content);	
	var content_raw = '';	
	var is_markdown = req.body.is_markdown && Boolean(req.body.is_markdown) || false;	
	var category = req.body.category && validator.trim(req.body.category);
	var user = req.session.user;
	var tags = req.body.tags || [];
	var status = req.body.status && validator.trim(req.body.status);
	var author = req.body.author && validator.trim(req.body.author);
	var is_hidden = req.body.is_hidden && Boolean(req.body.is_hidden) || false;	
	var allow_comment = req.body.allow_comment && Boolean(req.body.allow_comment) || true;	
	var allow_feed = req.body.allow_feed && Boolean(req.body.allow_feed) || true;	

	var ep = new eventproxy();
	ep.fail(next);

	ep.on('invalid',function(msg){
		return res.json({
			success: false,
			msg: msg
		});
	});	

	if(!title || title.length == 0){
		return ep.emit('invalid', '文章标题不能为空');		
	}

	if(!category || category.length == 0){
		return ep.emit('invalid', '请选择分类');		
	}

	if(category && !validator.isMongoId(category)){
		return ep.emit('invalid', '父级分类不正确');
	}

	if(!content || content.length == 0){
		return ep.emit('invalid', '文章内容不能为空');		
	}

	if(is_markdown){
		var md = new MarkdownIt();
		content_raw = content;
		content = md.render(content);		
	}	

	PostModel.findOneAndUpdate({_id: id}, {
		title:title,		
		summary: summary,
		content: content,
		content_raw: content_raw,
		category: category,
		user: user,
		author: author || user.nickname || user.name || '',	
		tags: tags,
		status: status,
		is_hidden: is_hidden,
		allow_comment: allow_comment,
		allow_feed: allow_feed
	},function(err, post){
		if(err){
			return res.json({
				success: false,
				msg: '更新失败'
			});
		}
		return res.json({
			success: true,
			msg: '更新成功',
			post: post
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
	PostModel.findOneAndRemove({_id: id}, function(err, flag){
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
	PostModel.remove({_id: {$in: ids}}, function(err, flag){
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