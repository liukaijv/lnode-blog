var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name:  String,
  slug: String,
  description: String,
  parent: {type: Schema.Types.ObjectId, ref: 'Category'},
  is_nav: { type: Boolean, default: false },
  created_at: {type: Date, default: Date.now } 
});

mongoose.model('Category',CategorySchema)