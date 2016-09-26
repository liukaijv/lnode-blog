var eventproxy = require('eventproxy');
var moment = require('moment');

var config = require('../config');

var PostModel = require('../models').Post;
var TagModel = require('../models').Tag;
var CategoryModel = require('../models').Category;

exports.index = function(req, res, next){		
  	return res.render('index', { title: 'Express'});  
}

// 文章列表
exports.post = function(req, res ,next){

	var page_size = req.query.page_size && parseInt(req.query.page_size) || config.list_size;
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

// 文章显示
exports.postShow = function(req, res, next){

	var slug = req.params.slug;
	if(!slug){
		return res.json({
			success: false,
			msg: '参数不正确'
		});
	}

	var ep = new eventproxy();
	ep.fail(next);

	ep.all('post', function(post){	

		var ep2 = new eventproxy();	
		ep2.all('prev', 'next', function(prev, next){
			return res.json({
				success: true,
				msg: '获取文章成功',		
				post: post,
				prev: prev,
				next: next
			});
		});

		PostModel.findOne({'created_at': {$lt: post.created_at }},function(err, prev){
			if(err){
				return res.json({
					success: false,
					msg: '获取上一篇文章失败'					
				});
			}
			ep2.emit('prev', prev);
		});

		PostModel.findOne({'created_at': {$gt: post.created_at }},function(err, next){
			if(err){
				return res.json({
					success: false,
					msg: '获取下一篇文章失败'					
				});
			}
			ep2.emit('next', next);
		})
		
	});

	PostModel.findOne({slug: slug}).populate('category tags').exec(function(err, post){
		if(err || !post){
			return res.json({
				success: false,
				msg: '获取文章失败'
			});
		}	
		ep.emit('post', post)
	});
}

exports.category = function(req, res, next){
	var id = req.params.id;
	if(!id){
		return res.json({
			success: false,
			msg: '参数不正确'
		});
	}
}

// 分类文章
exports.categoryShow = function(req, res, next){
	var slug = req.params.slug;
	if(!slug){
		return res.json({
			success: false,
			msg: '参数不正确'
		});
	}
}

// 所有标签
exports.tag = function(req, res, next){
	
}

// 标签文章
exports.tagShow = function(req, res, next){
	var slug = req.params.slug;
	if(!slug){
		return res.json({
			success: false,
			msg: '参数不正确'
		});
	}
}

// 文章归档
exports.archive = function(req, res, next){
	
	var ep = new eventproxy();
	ep.fail(next);

	ep.all('getArchive', function(posts){
		return res.json({
			success: true,
			msg: '获取归档成功',
			archive: posts			
		});
	});	

	PostModel.find().sort('-created_at').exec(function(err, posts){
		if(err || posts.length < 1){
			return res.json({
				success: false,
				msg: '获取文章失败'
			});
		}	
		var result = {};
		posts.forEach(function(item){			
	      var yearMonth = moment(item.created_at).format('YYYY年MM月');
	      if(!(yearMonth in result)){
	        result[yearMonth] = [];
	      }
	      result[yearMonth].push(item);
	    });	  
		ep.emit('getArchive', result);		
	});	
	
}

// rss聚合
exports.rss = function(req, res, next){

}