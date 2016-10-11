var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name:  String,
  slug: String,
  description: String,
  parent: {type: Schema.ObjectId, ref: 'Category'},
  posts: [{type: Schema.ObjectId, ref: 'Post'}],
  is_nav: { type: Boolean, default: false },
  created_at: {type: Date, default: Date.now } 
});

mongoose.model('Category',CategorySchema)