// config 
var path = require('path');

var config = {
	debug: false,
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
		origin: 'http://oe747l4go.bkt.clouddn.com'    	
	},

  	// 优先使用qn
  	upload: {
  		path: path.join(__dirname, 'public/upload/'),
  		url: '/public/upload/'
  	},

  	file_limit: '1MB',

  	// RSS配置
  	rss: {
  		title: 'noop的博客',
  		link: 'http://localhost:3000',
  		language: 'zh-cn',
  		description: 'noop的个人博客系统',
  		max_rss_items: 50
  	},
  };

  module.exports = config;