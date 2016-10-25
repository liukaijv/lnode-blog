webpackJsonp([3],{

/***/ 59:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(60)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] frontend\\views\\post_show.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(61)
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

/***/ 60:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		created: function created() {
			this.getPost();
		},
		data: function data() {
			return {
				post: {},
				prev: {},
				next: {}

			};
		},

		watch: {
			$route: function $route() {
				this.getPost();
			}
		},
		methods: {
			getPost: function getPost() {
				var _this = this;

				this.$http.get('post/' + this.$route.params.slug).then(function (result) {
					var data = result.data;
					if (data.success) {
						_this.post = data.post;
						_this.prev = data.prev;
						_this.next = data.next;
					}
				});
			}
		}
	};

/***/ },

/***/ 61:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"post\">\n\t<h2 class=\"post-title\">\n\t\t{{post.title}}\n\t</h2>\n\t<post-meta :post=\"post\"></post-meta>\n\t<div class=\"post-blockquote\">{{post.summary}}</div>\n\t<div class=\"post-body\">\n\t\t<div class=\"post-thumbnail\"></div>\n\t\t<div class=\"post-content markdown-body\">\t\t\t\t\t\n\t\t\t{{{post.content}}}\n\t\t</div>\n\t</div>\n</div>\n<post-tag :tags=\"post.tags\"></post-tag>\n<div class=\"gutter\" v-if=\"prev || next\">\n\t<div v-if=\"prev\" class=\"post-prev\">\n\t\t上一篇：<a v-link=\"{name: 'post_show', params: {slug: prev.slug }}\">{{prev.title}}</a>\n\t</div>\n\n\t<div v-if=\"next\" class=\"post-next\">\n\t\t下一篇：<a v-link=\"{name: 'post_show', params: {slug: next.slug }}\">{{next.title}}</a>\n\t</div>\n</div>\t\n";

/***/ }

});