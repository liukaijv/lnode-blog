var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({  
  name:  String,
  password: String,
  email: String,
  nickname: String,
  website: String,
  avatar: String, 
  bio: String, 
  group: {type: String, default: 'visitor'}, //visitor,contributor,administrator
  is_active: { type: Boolean, default: true },
  access_token: String,
  created_at: {type: Date, default: Date.now },
  updated_at: {type: Date, default: Date.now }
});

mongoose.model('User',UserSchema)