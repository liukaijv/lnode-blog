var config = require('../config');

var qn    = require('./store_qn');
var local = require('./store_local');

var store = null;
if(config.store_type == 'local'){
	store = local;
}else{
	store = qn || local
}

module.exports = store;
