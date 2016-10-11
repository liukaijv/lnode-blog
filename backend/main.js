import Vue from 'vue';
import VueRouter from 'vue-router';
import { sync } from 'vuex-router-sync';

Vue.use(VueRouter);

//css
import './assets/css/bootstrap.css';
import './assets/css/font-awesome.css';
import './assets/css/AdminLTE.css';
import './assets/css/skins/_all-skins.css';
import './styles/app.css';

//js
import './assets/js/bootstrap.js';

//directives
import select2 from './directives/select2';
Vue.directive('select', select2);

//filters
import date_format from './filters/date_format';
import sub_str from './filters/sub_str';
Vue.filter('date_format', date_format);
Vue.filter('sub_str', sub_str);

import store from './vuex/store';
import routeConfig from './routes';
import App from './app';

const debug = process.env.NODE_ENV !== 'production';
Vue.config.debug = debug;
Vue.config.devtools = debug;

let router = new VueRouter();
routeConfig(router);
sync(store, router);

router.start(App, '#app');

window.router = router;