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

import date_format from './filters/date_format';
Vue.filter('date_format', date_format);

import store from './vuex/store';
import routeConfig from './routes';
import App from './app';

let router = new VueRouter();
routeConfig(router);
sync(store, router);

router.start(App, '#app');

window.router = router;