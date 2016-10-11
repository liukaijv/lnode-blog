var eventproxy = require('eventproxy');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var moment = require('moment');

var logger = require('../utils/logger');

var ep_db = new eventproxy();
ep_db.fail(function(){	
	logger.error('seeder error');
	process.exit(1);
});

fs.exists(path.resolve(__dirname, 'seeder.lock'), function( exists ){   
    if(exists){
    	console.log('已执行过seed,请删除seeder目录下的seeder.lock文件再执行');
    	process.exit(0);
    }else{
    	ep_db.emit('exist');
    }
}); 

var dbConnect = require('../models').dbConnect;
dbConnect.connection.on('open', function(){
    dbConnect.connection.db.dropDatabase(function(err, result){
    	if(err){
    		console.log('database droped error');
    		process.exit(1);
    	}
    	console.log('database droped');
        ep_db.emit('droped');
    });
});

ep_db.all('exist', 'droped', function(){

	var User = require('../models').User;
	var Category = require('../models').Category;
	var Tag = require('../models').Tag;
	var Post = require('../models').Post;

	var ep = new eventproxy();

	ep.fail(function(){	
		logger.error('seeder error');
		process.exit(1);
	});

	ep.all('user_done', 'categroy_done', 'tag_done', function(){		

		// post 
		var ep_post = new eventproxy();
		ep_post.fail(function(){
			console.log('ep_post fail');
			process.exit(1);
		})

		ep_post.all('categroies', 'tags', 'users', function(categroies, tags, users){			
			var posts = require('./post_data');	
			var ep_post_each = new eventproxy();			
			ep_post_each.after('post_seeder', posts.length, function(){
				logger.info('all seeders success');							
				var date_str = '执行时间：' + moment().format('YYYY-MM-DD HH:mm:ss');
				fs.writeFile(path.resolve(__dirname, 'seeder.lock'), date_str, function(err){
				    console.log('create seeder.lock');
				    process.exit(0);
				});					
			});
			var tags_len = tags.length;		
			posts.forEach(function(item, i){
				var user = _.shuffle(users)[0];
				var category = _.shuffle(categroies)[0];									
				var tags_data = _.take(_.shuffle(tags),Math.floor(Math.random()*tags_len));	
				var created_at = moment().subtract(Math.floor(Math.random()*tags_len), 'months')						
				Post.create({
					title: item.title,
					content_raw: item.content,
					user: user,
					author: user.nickname || user.name || '',
					category: category,
					tags: tags_data,
					created_at: created_at				
				}, function(err, post){	
					 	console.log('post_seeder');
						ep_post_each.emit('post_seeder');					
				});
			});
			
		});
		
		Category.find({}, function(err, categroies){
			if(err) ep_post.emit('error', err)
			console.log('get categroies')
			ep_post.emit('categroies', categroies)
		});
		Tag.find({}, function(err, tags){
			if(err) ep_post.emit('error', err)				
			console.log('get tags')
			ep_post.emit('tags', tags)
		});
		User.find({}, function(err, users){
			if(err) ep_post.emit('error', err)
			console.log('get users')
			ep_post.emit('users', users)			
		});
			
	});

	// user
	bcrypt.hash('admin', 10, function(err, hash){	
		User.create([		
		{
			name:'admin',
			password: hash,
			email: '89016230@qq.com',
			nickname: 'noop',
			group:'administrator'
		}
		],function(err,data){
			console.log('user_seeder')
			ep.emit('user_done');
		});
	});

	// categroy
	var ep_category = new eventproxy();
	var categories = ['php', 'html', 'css', 'lua', 'python', 'javascript'];
	ep_category.after('category_seeder', categories.length, function(){
		ep.emit('categroy_done');
	});
	categories.forEach(function(item){
		Category.create({
			name: item
		}, function(err, data){			
			console.log('category_seeder')
			ep_category.emit('category_seeder');
		});
	});	

	// tag
	var ep_tag = new eventproxy();
	var tags = ['php', 'html', 'css', 'lua', 'python', 'javascript', 'css3', 'express'];
	ep_tag.after('tag_seeder', tags.length, function(){
		ep.emit('tag_done');
	});
	tags.forEach(function(item){
		Tag.create({
			name: item
		}, function(err, data){
			console.log('tag_seeder')
			ep_tag.emit('tag_seeder');
		});
	});

})