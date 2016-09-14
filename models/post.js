var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId  = Schema.ObjectId;
var relationship = require("mongoose-relationship");

var PostSchema = new Schema({
  title:  String,
  description: String,
  content: String,
  content_raw: String,
  category: {type: ObjectId, ref: 'Category'}, 
  user: {type: ObjectId, ref:'User'}, 
  tags: [{type: ObjectId, ref: 'Tag', childPath: 'posts'}],
  status: {type: String, default: 'publish'}, //draft,publish
  is_hidden: {type: Boolean, default: false },
  allow_comment: {type: Boolean, default: true },
  allow_feed: {type: Boolean, default: true }, 
  hits: {type: Number, default: 0},
  comments: {type: Number, default: 0},
  created_at: {type: Date, default: Date.now },
  updated_at: {type: Date, default: Date.now }
});

PostSchema.plugin(relationship, {relationshipPathName: 'tags'})
mongoose.model('Post',PostSchema)