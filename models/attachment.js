var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AttachmentSchema = new Schema({
	name: String,
  	url:  String,
  	post: {type: Schema.Types.ObjectId, ref: 'Post'},
  	created_at: {type: Date, default: Date.now }
});

mongoose.model('Attachment', AttachmentSchema)