var express = require('express');
var router = express.Router();

var middlewares = require('../middlewares/backend');
var AuthController = require('../controllers/backend/auth');
var CategoryController = require('../controllers/backend/category');
var TagController = require('../controllers/backend/tag');
var PostController = require('../controllers/backend/post');

router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);

// category
router.get('/category', middlewares.admin_required, CategoryController.index);
router.get('/category/create', middlewares.admin_required, CategoryController.create);
router.post('/category/create', middlewares.admin_required, CategoryController.store);
router.get('/category/:id/edit', middlewares.admin_required, CategoryController.edit);
router.put('/category/:id/edit', middlewares.admin_required, CategoryController.update);
router.delete('/category/:id', middlewares.admin_required, CategoryController.delete);
router.post('/category/delete', middlewares.admin_required, CategoryController.deleteBatch);

// tag
router.get('/tag', middlewares.admin_required, TagController.index);
router.post('/tag/create', middlewares.admin_required, TagController.store);
router.get('/tag/:id/edit', middlewares.admin_required, TagController.edit);
router.put('/tag/:id/edit', middlewares.admin_required, TagController.update);
router.delete('/tag/:id', middlewares.admin_required, TagController.delete);
router.post('/tag/delete', middlewares.admin_required, TagController.deleteBatch);

// post
router.get('/post', middlewares.admin_required, PostController.index);
router.get('/post/create', middlewares.admin_required, PostController.create);
router.post('/post/create', middlewares.admin_required, PostController.store);
router.get('/post/:id/edit', middlewares.admin_required, PostController.edit);
router.put('/post/:id/edit', middlewares.admin_required, PostController.update);
router.delete('/post/:id', middlewares.admin_required, PostController.delete);
router.post('/post/delete', middlewares.admin_required, PostController.deleteBatch);

module.exports = router;
