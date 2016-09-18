var express = require('express');
var router = express.Router();
var HomeController = require('../controllers/home');

router.get('/', HomeController.index);
router.get('/post', HomeController.post);
router.get('/post/:id', HomeController.postShow);
router.get('/category', HomeController.category);
router.get('/category/:id', HomeController.categoryShow);
router.get('/tag', HomeController.tag);
router.get('/tag/:id', HomeController.tagShow);
router.get('/archive', HomeController.archive);

module.exports = router;
