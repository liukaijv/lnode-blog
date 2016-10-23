import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Cache from 'lscache';

Vue.use(VueRouter);
Vue.use(VueResource);

import routeConfig from './routes';
import App from './app';

//common components
import registerComponent from './components/registerComponent';
registerComponent(Vue);

Vue.prototype.$session = window.sessionStorage || {};
Vue.prototype.$cache = Cache;
Vue.cache = Cache;

import httpCache from './lib/cache';
httpCache(Vue);

//filters
import filters from './filters';
filters(Vue);

const debug = process.env.NODE_ENV !== 'production';
Vue.config.debug = debug;
Vue.config.devtools = debug;

// http
Vue.http.options.cache = 5;
Vue.http.options.root = '/api';

let router = new VueRouter({
	history: !debug,
	linkActiveClass: 'active'
});
routeConfig(router);

router.start(App, '#app');

window.router = router;