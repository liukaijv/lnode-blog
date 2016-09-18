// config 

var config = {
	debug: true,
	session_secret:'secret',
	//database
	db: 'mongodb://localhost:27017/lnode-blog',
	//backend config
	backend_list_size: 10,
	//frontend config
	list_size: 10,
	allow_comment: true,
	date_format: 'YYYY-MM-DD HH:mm:ss'
}

module.exports = config;