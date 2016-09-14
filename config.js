// config 

var config = {
	debug: true,
	session_secret:'secret',
	//database
	db: 'mongodb://localhost:27017/lnode-blog',
	//backend config
	backend_list_size: 10
}

module.exports = config;