var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name:  String,
  description: String,
  parent_id: Schema.Types.ObjectId,
  created_at: {type: Date, default: Date.now } 
});

mongoose.model('Category',CategorySchema)