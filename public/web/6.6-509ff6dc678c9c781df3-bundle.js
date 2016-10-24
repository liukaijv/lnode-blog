webpackJsonp([6],{

/***/ 68:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(69)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] frontend\\views\\archives.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(70)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./archives.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 69:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		created: function created() {
			this.getPosts();
		},
		data: function data() {
			return {
				archive: [],
				page: 1,
				totalPage: 1
			};
		},

		watch: {
			$route: function $route() {
				this.getPosts();
			}
		},
		methods: {
			getPosts: function getPosts() {
				var _this = this;

				this.$http.get('archives').then(function (result) {
					var data = result.data;
					if (data.success) {
						_this.archive = data.archive;
					} else {
						_this.archive = [];
					}
				});
			}
		}
	};

/***/ },

/***/ 70:
/***/ function(module, exports) {

	module.exports = "\n\n\t<div class=\"archive-item\" v-for=\"(yearMonth, posts) in archive\" v-if=\"archive\">\n\t\t<h3>{{yearMonth}} <small>({{posts.length}})</small></h3>\n\t\t<ul v-if=\"posts\">\n\t\t\t<li v-for=\"post in posts\">\n\t\t\t\t<a v-link=\"{name: 'post_show', params: {slug: post.slug }}\">{{post.title}}</a>\t\n\t\t\t</li>\n\t\t</ul>\t\t\t\t\n\t</div>\n\n<empty v-else></empty>\n";

/***/ }

});