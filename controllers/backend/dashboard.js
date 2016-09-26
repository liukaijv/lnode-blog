var eventproxy = require('eventproxy');

var TagModel = require('../../models').Tag;
var CategoryModel = require('../../models').Category;
var PostModel = require('../../models').Post;

exports.index = function(req, res, next){


	var ep = new eventproxy();
	ep.fail(next);

	ep.all('post_count', 'tag_count', 'category_count', function(post_count, tag_count, category_count){		
		return res.json({
			success: true,
			msg: '获取数据成功',
			post_count: post_count,
			tag_count: tag_count,
			category_count: category_count
		});
	});

	PostModel.count(function(err, count){
		if(err){
			return res.json({
				success: false,
				msg: '统计失败'
			});
		}
		ep.emit('post_count', count);
	});

	CategoryModel.count(function(err, count){
		if(err){
			return res.json({
				success: false,
				msg: '统计失败'
			});
		}
		ep.emit('category_count', count);
	});

	TagModel.count(function(err, count){
		if(err){
			return res.json({
				success: false,
				msg: '统计失败'
			});
		}
		ep.emit('tag_count', count);
	})
	
	
}