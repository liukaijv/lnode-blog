/**
* 前台api
*/

var _ = require('lodash');
var eventproxy = require('eventproxy');
var moment = require('moment');

var config = require('../config');

var PostModel = require('../models').Post;
var TagModel = require('../models').Tag;
var CategoryModel = require('../models').Category;

var CategoryService= require('../services/category');
var PostService= require('../services/post');
var TagService= require('../services/tag');

// 菜单
exports.menus = function(req, res, next){
	CategoryService.menus(function(err, menus){		
		if(err){
			return res.json({
				success: false,
				msg: '获取菜单失败'
			});
		}
		return res.json({
			success: true,
			msg: '获取菜单成功',
			menus: menus
		});
	}); 
}

// 热门文章
exports.hotPosts = function(req, res, next){		
	PostService.hot(10, function(err, posts){		
		if(err){
			return res.json({
				success: false,
				msg: '获取热门文章失败'
			});
		}	
		return res.json({
			success: true,
			msg: '获取热门文章成功',
			hot_posts: posts
		});
	});
}

// 文章列表
exports.posts = function(req, res ,next){

	var page_size = req.query.page_size && parseInt(req.query.page_size) || config.list_size;
	var page = req.query.page && parseInt(req.query.page) || 1;
	var keyword = req.query.keyword || '';

	if(!page || !page_size){
		return res.json({
			success: false,
			msg: '参数错误'
		});
	}	

	var ep = new eventproxy();
	ep.fail(next);

	ep.all('getPosts', 'postCount', function(posts, total_page){
		return res.json({
			success: true,
			msg: '获取文章成功',
			posts: posts,	
			page:page,		
			total_page: total_page,			
			page_size:page_size
		});
	});

	var condition = {};	
	var opt = {
		skip: (page-1) * page_size,
		limit: page_size,
		sort: '-created_at'
	};	
	
	if(keyword){
		condition = _.assign(condition, { title: new RegExp(keyword, 'i')});		
	}	

	PostService.postsCount(condition, function(err, count){
		if(err){
			return res.json({
				success: false,
				msg: '文章统计失败'
			});
		}
		var total_page = Math.ceil(count/page_size);
		ep.emit('postCount', total_page);		
	})

	PostService.postsByQuery(condition, opt, function(err, posts){
		if(err){
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
	var referer = req.query.referer;

	if(!slug){
		return res.json({
			success: false,
			msg: '参数不正确'
		});
	}

	console.log(referer)

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
		post.hits = post.hits + 1;
		post.save();			
		ep.emit('post', post)
	});
}

// 所有分类
exports.categories = function(req, res, next){
	CategoryModel.find({},'-posts').lean().exec(function(err, categories){
		if(err){
			return res.json({
				success: false,
				msg: '获取分类失败'
			});
		}	

		function tree(data, parent){
			var result = [] , temp;
			for(var i in data){					
				if(data[i].parent == parent){
					result.push(data[i]);									
					temp = tree(data, data[i]['_id'].toString()); 									        
					if(temp.length > 0){
						data[i].children=temp;
					}else{
						data[i].children = null;
					}  
				}       
			}
			return result;
		}
	
		var treeArr = tree(categories, null);			

		return res.json({
			success: true,
			msg: '获取分类成功',
			categories: treeArr
		});		
	});
}

// 分类文章
exports.categoryShow = function(req, res, next){

	var slug = req.params.slug;
	var page_size = req.query.page_size && parseInt(req.query.page_size) || config.list_size;
	var page = req.query.page && parseInt(req.query.page) || 1;
	
	if(!slug){
		return res.json({
			success: false,
			msg: '参数不正确'
		});
	}
	CategoryModel.findOne({slug: slug}).populate({path: 'posts', match: {is_hidden: {$eq: true}}}).exec(function(err, category){		
		if(err || !category){
			return res.json({
				success: false,
				msg: '获取分类失败'
			});
		}
		return res.json({
			success: true,
			msg: '获取分类成功',
			posts: category.posts,	
			page:page,		
			total_page: Math.ceil(category.posts.length / page_size),			
			page_size:page_size
		});	

	})
}

// 所有标签
exports.tags = function(req, res, next){		
	TagService.sortedTags(function(err, tags){		
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
	});
}

// 标签文章
exports.tagShow = function(req, res, next){
	var slug = req.params.slug;
	var page_size = req.query.page_size && parseInt(req.query.page_size) || config.list_size;
	var page = req.query.page && parseInt(req.query.page) || 1;	
	if(!slug){
		return res.json({
			success: false,
			msg: '参数不正确'
		});
	}
	TagModel.findOne({slug: slug}).populate('posts').exec(function(err, tag){			
		if(err || !tag){
			return res.json({
				success: false,
				msg: '获取标签失败'
			});
		}
		return res.json({
			success: true,
			msg: '获取标签成功',
			posts: tag.posts,	
			page:page,		
			total_page: Math.ceil(tag.posts.length / page_size),			
			page_size:page_size
		});	

	})
}

// 文章归档
exports.archives = function(req, res, next){
	
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