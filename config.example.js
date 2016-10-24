// config 
var path = require('path');

var config = {
	debug: false,
	session_secret:'secret',
	//database
	db: 'mongodb://localhost:27017/database',
	//backend config
	backend_list_size: 10,

	//frontend config
	list_size: 10,
	allow_comment: true,
	date_format: 'YYYY-MM-DD HH:mm:ss',

	// 文件上传配置
	store_type: 'local',
	qn_access: {
		accessKey: 'accessKey',
		secretKey: 'secretKey',
		bucket: 'bucket',
		origin: 'http://7n.clouddn.com'    	
	},

  	// 优先使用qn
  	upload: {
  		path: path.join(__dirname, 'public/upload/'),
  		url: '/public/upload/'
  	},

  	file_limit: '1MB',

  	// rss配置
  	rss: {
  		title: 'rss title',
  		link: 'http://localhost:3000',
  		language: 'zh-cn',
  		description: 'rss description',
  		max_rss_items: 50
  	},
  };

  module.exports = config;