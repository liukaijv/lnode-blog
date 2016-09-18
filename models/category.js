var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name:  String,
  slug: String,
  description: String,
  parent_id: Schema.Types.ObjectId,
  is_nav: { type: Boolean, default: false },
  created_at: {type: Date, default: Date.now } 
});

mongoose.model('Category',CategorySchema)