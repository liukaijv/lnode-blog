// config 
var path = require('path');

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
	date_format: 'YYYY-MM-DD HH:mm:ss',

	// 文件上传配置
	store_type: 'local',
	qn_access: {
		accessKey: '0mGOTinIiIvQZJFNRwmR_ibnj3LijxYEiedddXOe',
    	secretKey: 'hJ4XsEo48BinnZK7IIfOSIJuVDYVsCgQ4IxjQwy_',
		bucket: 'blog',
		origin: 'http://blog.u.qiniudn.com'    	
	},
  	
  	// 注：如果填写 qn_access，则会上传到 7牛，以下配置无效
  	upload: {
  		path: path.join(__dirname, 'public/upload/'),
  		url: '/public/upload/'
  	},

  	file_limit: '1MB',
}

module.exports = config;