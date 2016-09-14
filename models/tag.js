var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TagSchema = new Schema({
  name:  String,
  posts: [{ type:Schema.ObjectId, ref:"Post" }],
  created_at: {type: Date, default: Date.now }  
});

mongoose.model('Tag',TagSchema)