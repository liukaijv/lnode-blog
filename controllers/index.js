var config       = require('../config');
var convert      = require('data2xml')();
var PostService  = require('../services/post');

// 首页
exports.index = function(req, res, next){		
	return res.render('index');
}

// rss
exports.rss = function(req, res, next){		
	if (!config.rss) {
		res.statusCode = 404;
		return res.send('Please set `rss` in config.js');
	}
	res.contentType('application/xml');	
	var opt = { limit: config.rss.max_rss_items, sort: '-created_at'};
	PostService.postsByQuery({}, opt, function (err, posts) {
		if (err) {
			return next(err);
		}		
		var rss_obj = {
			_attr: { version: '2.0' },
			channel: {
				title: config.rss.title,
				link: config.rss.link,
				language: config.rss.language,
				description: config.rss.description,
				item: []
			}
		};
		posts.forEach(function (post) {
			rss_obj.channel.item.push({
				title: post.title,
				link: config.rss.link + '/post/' + post.slug,
				guid: config.rss.link + '/post/' + post._id,
				description: post.summary ? post.summary : post.content,
				author: post.author,
				pubDate: post.created_at.toUTCString()
			});
		});
		var rssContent = convert('rss', rss_obj);
		return res.send(rssContent);
	});	
}