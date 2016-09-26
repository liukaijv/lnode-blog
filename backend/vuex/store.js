import Vue from 'vue';
import Vuex from 'vuex';
import plugins from './plugins'

Vue.use(Vuex);

import { 
	LOGIN,
	LOGOUT,
	AUTHORIZED,
	ALERT,
	ALERT_HIDE,
	CONFIRM_SHOW,
	CONFIRM_HIDE,
	PAGE_CHANGE	
} from './mutation-types';

// mutations
import dashboard from './mutations/dashboard';
import category from './mutations/category';
import tag from './mutations/tag';
import post from './mutations/post';

const debug = process.env.NODE_ENV !== 'production'

const state = {	
	user: {
		name:''
	},
	alert: {
		type: 'info',
		msg: '',
		interval: null
	},
	confirm: {
		show: false,
		msg: '',
		onOk: ()=>{},
		onCancel: ()=>{}
	}
}

// store instance
const store = new Vuex.Store({
	state,
	mutations: {
		[LOGIN] (state, user){
			state.user = user;
		},
		[LOGOUT] (state){
			state.user = {
				name:''
			};
		},
		[AUTHORIZED] (state, user){			
			state.user = user ? user : {
				name:''
			};
		},
		[ALERT] (state, info){
			state.alert = info;
			state.alert.interval = setTimeout(function(){
				if(state.alert.msg != ''){
					state.alert.msg = '';
				}
			}, 3000)
		},
		[ALERT_HIDE] (state){
			state.alert.msg = '';
			clearTimeout(state.alert.interval);
		},
		[CONFIRM_SHOW] (state, msg, callbackOk, callbackCancel){
			state.confirm.show = true;			
			state.confirm.msg = msg;			
			state.confirm.onOk = callbackOk ? callbackOk : ()=>{
				state.confirm.show = false;
			};	
			state.confirm.onCancel = callbackCancel ? callbackCancel : ()=>{
				state.confirm.show = false;
			};	
		},
		[CONFIRM_HIDE] (state){
			state.confirm.show = false;	
			state.confirm.onOk = ()=>{};		
			state.confirm.callbackCancel = ()=>{};			
		},
		[PAGE_CHANGE] (state, module, page = 1){
			state[module].page = page;
		}
	},
	modules: {
		dashboard,
		category,
		tag,
		post
	},
	// strict: debug,
	plugins
});

export default store;