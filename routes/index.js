var express = require('express');
var router = express.Router();
var IndexController = require('../controllers/index');

router.get('/', IndexController.index);

module.exports = router;