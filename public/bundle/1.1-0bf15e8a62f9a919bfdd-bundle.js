webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(8)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] views\\layout.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(17)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./layout.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _header = __webpack_require__(9);

	var _header2 = _interopRequireDefault(_header);

	var _footer = __webpack_require__(12);

	var _footer2 = _interopRequireDefault(_footer);

	var _aside = __webpack_require__(14);

	var _aside2 = _interopRequireDefault(_aside);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
		ready: function ready() {
			this.getMenus();
		},
		data: function data() {
			return {
				menus: []
			};
		},


		components: {
			BlogHeader: _header2.default,
			BlogFooter: _footer2.default,
			BlogAside: _aside2.default
		},

		methods: {
			getMenus: function getMenus() {
				var _this = this;

				this.$http.get('menus').then(function (result) {
					var data = result.data;
					if (data.success) {
						_this.menus = data.menus;
					}
				});
			}
		}
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(10)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] views\\common\\header.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(11)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./header.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		props: {
			menus: {
				required: true,
				type: Array
			}
		},
		data: function data() {
			return {
				keyword: ''
			};
		}
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = "\n<header>\n\t<div class=\"container\">\n\t\t<h1 class=\"logo\">\n\t\t\t<a v-link=\"{name: 'index' }\">lnode</a>\n\t\t</h1>\t\t\t\t\n\t\t<nav class=\"menu\">\n\t\t\t<ul>\n\t\t\t\t<li v-for=\"menu in menus\">\n\t\t\t\t\t<a v-link=\"{name: 'category_post', params: {slug: menu.slug }}\">{{menu.name}}</a>\n\t\t\t\t</li>\t\t\n\t\t\t\t<li>\n\t\t\t\t\t<a v-link=\"{name: 'archives'}\">归档</a>\n\t\t\t\t</li>\t\t\t\n\t\t\t</ul>\n\t\t</nav>\n\t\t<form class=\"search-form\" @submit.prevent=\"$route.router.go({name: 'index', query: {keyword: keyword }})\">\n\t\t\t<input type=\"type\" placeholder=\"\" v-model=\"keyword\">\n\t\t\t<button><i class=\"lb-icon-search\"></i></button>\n\t\t</form>\n\t</div>\n\t\n</header>\n";

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_template__ = __webpack_require__(13)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./footer.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = "\n<footer>\n\t<div class=\"container\">\n\t\t<p>&copy; 2016 Noop all rights reserved.</p>\n\t</div>\n</footer>\n";

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(15)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] views\\common\\aside.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(16)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./aside.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		ready: function ready() {
			var _this = this;

			this.$http.get('hot_posts').then(function (result) {
				var data = result.data;
				if (data.success) {
					_this.hot_posts = data.hot_posts;
				}
			});
			this.$http.get('tags').then(function (result) {
				var data = result.data;
				if (data.success) {
					_this.tags = data.tags;
				}
			});
			this.$http.get('categories').then(function (result) {
				var data = result.data;
				if (data.success) {
					_this.categories = data.categories;
				}
			});
		},
		data: function data() {
			return {
				hot_posts: [],
				tags: [],
				categories: []
			};
		}
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = "\n<aside>\n\t<div class=\"widget\" v-if=\"hot_posts\">\n\t\t<h3>热门文章</h3>\n\t\t<ul class=\"list\">\n\t\t\t<li v-for=\"post in hot_posts\">\n\t\t\t\t<a v-link=\"{name: 'post_show', params: {slug: post.slug }}\">{{post.title}}</a>\t\t\t\t\t\n\t\t\t</li>\n\t\t</ul>\t\t\t\n\t</div>\n\t<div class=\"widget\" v-if=\"categories\">\n\t\t<h3>所有分类</h3>\n\t\t<ul class=\"list\">\n\t\t\t<li v-for=\"category in categories\">\n\t\t\t\t<a v-link=\"{name: 'category_post', params: {slug: category.slug }}\">{{category.name}}</a>\n\t\t\t\t<ul v-for=\"category in category.children\">\n\t\t\t\t\t<li>\n\t\t\t\t\t\t<a v-link=\"{name: 'category_post', params: {slug: category.slug }}\">{{category.name}}</a>\n\t\t\t\t\t</li>\n\t\t\t\t</ul>\n\t\t\t</li>\n\t\t</ul>\t\t\t\n\t</div>\t\n\t<div class=\"widget\" v-if=\"tags\">\n\t\t<h3>热门标签</h3>\n\t\t<ul class=\"list-inline\">\n\t\t\t<li v-for=\"tag in tags\">\n\t\t\t\t<a v-link=\"{name: 'tag_post', params: {slug: tag.slug }}\">{{tag.name}} <span>({{tag.post_count}})</span></a>\n\t\t\t</li>\n\t\t</ul>\t\t\t\n\t</div>\t\n</aside>\n";

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = "\n<div>\t\t\n\t<blog-header :menus=\"menus\"></blog-header>\n\t<div class=\"container content\">\n\t\t<main>\n\t\t\t<router-view></router-view>\n\t\t</main>\t\n\t\t<blog-aside></blog-aside>\t\t\n\t</div>\n\t<blog-footer></blog-footer>\n</div>\n";

/***/ }
]);