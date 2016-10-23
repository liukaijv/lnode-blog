var _ = require('lodash');
var TagModel = require('../models').Tag;

exports.sortedTags = function (callback) {
	TagModel.find().sort({post_count:'asc'}).exec(function(err, tags){	
		tags = _.sortBy(tags, function(item){
			return -item.post_count;
		});
		callback(err, tags); 	
	});  
};