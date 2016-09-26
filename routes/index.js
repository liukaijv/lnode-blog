var express = require('express');
var router = express.Router();
var HomeController = require('../controllers/home');

router.get('/', HomeController.index);
router.get('/post', HomeController.post);
router.get('/post/:slug', HomeController.postShow);
router.get('/category', HomeController.category);
router.get('/category/:slug', HomeController.categoryShow);
router.get('/tag', HomeController.tag);
router.get('/tag/:slug', HomeController.tagShow);
router.get('/archive', HomeController.archive);

module.exports = router;
