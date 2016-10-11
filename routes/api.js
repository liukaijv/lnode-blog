var express = require('express');
var router = express.Router();
var ApiController = require('../controllers/api');

router.get('/menus', ApiController.menus);
router.get('/hot_posts', ApiController.hotPosts);
router.get('/posts', ApiController.posts);
router.get('/post/:slug', ApiController.postShow);
router.get('/categories', ApiController.categories);
router.get('/category/:slug', ApiController.categoryShow);
router.get('/tags', ApiController.tags);
router.get('/tag/:slug', ApiController.tagShow);
router.get('/archives', ApiController.archives);

module.exports = router;