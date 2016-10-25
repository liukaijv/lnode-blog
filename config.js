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

  	// rss配置
  	rss: {
  		title: '学习的点点滴滴',
  		link: 'http://www.onoop.com/',
  		language: 'zh-cn',
  		description: '编程学习中的读书笔记，编程技巧，开发经验，分享开发心得和经验的博客',
  		max_rss_items: 50
  	},
  };

  module.exports = config;