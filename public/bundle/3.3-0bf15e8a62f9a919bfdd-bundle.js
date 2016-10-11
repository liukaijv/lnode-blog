webpackJsonp([3],{

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

/***/ 27:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(28)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] views\\post_show.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(29)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./post_show.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 28:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _pagination = __webpack_require__(20);

	var _pagination2 = _interopRequireDefault(_pagination);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
		ready: function ready() {
			this.getPost();
		},
		data: function data() {
			return {
				post: {}
			};
		},

		watch: {
			$route: function $route() {
				this.getPost();
			}
		},
		components: {
			Pagination: _pagination2.default
		},
		methods: {
			getPost: function getPost() {
				var _this = this;

				this.$http.get('post/' + this.$route.params.slug).then(function (result) {
					var data = result.data;
					if (data.success) {
						_this.post = data.post;
					}
				});
			}
		}
	};

/***/ },

/***/ 29:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"posts\">\n\n\t<div class=\"post\">\n\t\t<h2 class=\"post-title\">\n\t\t\t<a>{{post.title}}</a>\n\t\t</h2>\n\t\t<div class=\"post-meta\">\n\t\t\t<span>{{post.created_at | date_format 'YYYY-MM-DD'}} · </span>\n\t\t\t<span v-if=\"post.category\"><a href=\"#\">{{post.category.name}}</a> · </span>\n\t\t\t<span>{{post.hits}} Views · </span>\n\t\t\t<span>{{post.comments}} Replies</span>\n\t\t</div>\n\t\t<div class=\"post-body\">\n\t\t\t<div class=\"post-thumbnail\"></div>\n\t\t\t<div class=\"post-content markdown-body\">\t\t\t\t\t\n\t\t\t\t{{{post.content}}}\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n";

/***/ }

});