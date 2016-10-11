var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TagSchema = new Schema({
	name:  String,
	slug: String,
	posts: [{ type:Schema.ObjectId, ref:"Post" }],
	created_at: {type: Date, default: Date.now }  
});

TagSchema.virtual('post_count').get(function(){
	return this.posts ? this.posts.length : 0;
});

TagSchema.set('toJSON', { virtuals: true });

TagSchema.set('toObject', { virtuals: true });

mongoose.model('Tag',TagSchema)