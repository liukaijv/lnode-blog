var CategoryModel = require('../models').Category;

exports.menus = function (callback) {
 	CategoryModel.find({'is_nav':true}, callback);  
};