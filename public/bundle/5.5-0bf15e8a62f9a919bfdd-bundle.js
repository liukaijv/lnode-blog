webpackJsonp([5],{

/***/ 20:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(21)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] components\\pagination.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(22)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./pagination.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 21:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		props: {
			page: {
				required: true,
				type: Number,
				default: 1
			},
			totalPage: {
				required: true,
				type: Number
			},
			showSize: {
				type: Number,
				default: 5
			},
			action: {
				type: Function,
				default: function _default(page) {
					console.log(page);
				}
			}
		},
		computed: {
			isShow: function isShow() {
				return this.totalPage > 1;
			},
			pages: function pages() {
				var totalPage = this.totalPage,
				    currentPage = this.page,
				    showSize = this.showSize,
				    left = 1,
				    right = totalPage,
				    pageArr = [];
				if (totalPage > showSize) {
					var halfLeft = Math.floor((showSize - 1) / 2);
					var halfRight = Math.ceil((showSize - 1) / 2);
					if (currentPage > halfRight && currentPage < totalPage - halfLeft) {
						left = currentPage - halfRight;
						right = currentPage + halfLeft;
					} else {
						if (currentPage <= halfRight) {
							left = 1;
							right = showSize;
						} else {
							right = totalPage;
							left = totalPage - (showSize - 1);
						}
					}
				}
				while (left <= right) {
					pageArr.push(left);
					left++;
				}
				return pageArr;
			},
			showPrev: function showPrev() {
				return this.page > 1;
			},
			showNext: function showNext() {
				return this.page < this.totalPage;
			}
		}
	};

/***/ },

/***/ 22:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"paginate-container\" v-if=\"isShow\">\n\t<div class=\"pagination\">\n\t\t<a v-if=\"showPrev\" @click=\"action(page-1)\">&laquo;</a>\n\t\t<a v-for=\"i in pages\" :class=\"{active : page == i}\" @click=\"action(i)\">{{i}}</a>\n\t\t<a v-if=\"showNext\" @click=\"action(page+1)\">&raquo;</a>\n\t</div>\n</div>\n";

/***/ },

/***/ 23:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(24)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] components\\post_item.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(25)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./post_item.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 24:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		props: {
			post: {
				type: Object,
				default: function _default() {
					return {};
				}
			}
		}
	};

/***/ },

/***/ 25:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"post\">\n\t<h2 class=\"post-title\">\n\t\t<a v-link=\"{name: 'post_show', params: {slug: post.slug }}\">{{post.title}}</a>\n\t</h2>\n\t<div class=\"post-meta\">\n\t\t<span>{{post.created_at | date_format 'YYYY-MM-DD'}} · </span>\t\n\t\t<span v-if=\"post.category && post.category.slug\">\n\t\t\t<a v-link=\"{name: 'category_post', params: {slug: post.category.slug }}\">{{post.category.name}}</a> · \n\t\t</span>\t\t\n\t\t<span>{{post.hits}} Views · </span>\n\t\t<span>{{post.comments}} Replies</span>\n\t</div>\n\t<div class=\"post-body\">\n\t\t<div class=\"post-thumbnail\"></div>\n\t\t<div class=\"post-content\">\n\t\t\t<template v-if=\"post.summary\">{{{post.summary}}}</template>\n\t\t\t<template v-else>{{{post.content | strip_tags | sub_str '250' true}}}</template>\n\t\t</div>\n\t</div>\n</div>\n";

/***/ },

/***/ 33:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(34)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] views\\tag_post.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(35)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./tag_post.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 34:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _pagination = __webpack_require__(20);

	var _pagination2 = _interopRequireDefault(_pagination);

	var _post_item = __webpack_require__(23);

	var _post_item2 = _interopRequireDefault(_post_item);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
		created: function created() {
			this.getPostsByTag();
		},
		data: function data() {
			return {
				posts: [],
				page: 1,
				totalPage: 1
			};
		},

		components: {
			Pagination: _pagination2.default,
			Post: _post_item2.default
		},
		watch: {
			$route: function $route() {
				this.getPostsByTag();
			}
		},
		methods: {
			getPostsByTag: function getPostsByTag() {
				var _this = this;

				var page = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

				this.$http.get('tag/' + this.$route.params.slug, { params: { page: page } }).then(function (result) {
					var data = result.data;
					if (data.success) {
						_this.posts = data.posts;
						_this.page = data.page;
						_this.totalPage = data.total_page;
					} else {
						_this.posts = [];
					}
				});
			}
		}
	};

/***/ },

/***/ 35:
/***/ function(module, exports) {

	module.exports = "\n<div>\n\t<div class=\"posts\">\t\t\t\n\n\t\t<post v-for=\"post in posts\" :post=\"post\"></post>\n\n\t</div>\n\n\t<pagination :page=\"page\" :total-page=\"totalPage\" :action=\"getPostsByTag\"></pagination>\n\n\n</div>\n";

/***/ }

});