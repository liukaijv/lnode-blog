webpackJsonp([4],{

/***/ 62:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(63)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] frontend\\views\\category_post.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(64)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./category_post.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 63:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		created: function created() {
			this.getPostsByCagegory();
		},
		data: function data() {
			return {
				posts: [],
				page: 1,
				totalPage: 1
			};
		},

		watch: {
			$route: function $route() {
				this.getPostsByCagegory();
			}
		},
		methods: {
			getPostsByCagegory: function getPostsByCagegory() {
				var _this = this;

				var page = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

				this.$http.get('category/' + this.$route.params.slug, { params: { page: page } }).then(function (result) {
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

/***/ 64:
/***/ function(module, exports) {

	module.exports = "\t\n<template v-if=\"posts.length\">\n\t<post v-for=\"post in posts\" :post=\"post\"></post>\n</template>\n<empty v-else></empty>\n<pagination :page=\"page\" :total-page=\"totalPage\" :action=\"getPosts\"></pagination>\n";

/***/ }

});