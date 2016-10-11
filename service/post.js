var _ = require('lodash');
var PostModel = require('../models').Post;

exports.latest = function (size, callback) {
 	PostModel.find({'is_hidden':true}).sort({created_at:'desc'}).populate('category').limit(size||10).exec(callback);  
};

exports.hot = function (size, callback) {
 	PostModel.find({'is_hidden':true}).sort({hits:'desc',comments:'desc', updated_at: 'desc', created_at:'desc'}).populate('category').limit(size||10).exec(callback);  
};

exports.postsCount  = function(query, callback){
	var condition = {
		is_hidden: true
	};
	query = _.assign(condition, query || {});
	PostModel.count(query, function(err, count){
		callback(err, count);
	});	
}

exports.postsByQuery  = function(query, opt, callback){
	var condition = {
		is_hidden: true
	};
	query = _.assign(condition, query || {});
	PostModel.find(query, null, opt).populate('category tags').exec(function(err, posts){
		callback(err, posts);
	});		
}