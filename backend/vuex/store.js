import Vue from 'vue';
import Vuex from 'vuex';
import plugins from './plugins'

Vue.use(Vuex);

import { 
	LOGIN,
	LOGOUT,
	AUTHORIZED,
	USER_UPDATE,
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
import user from './mutations/user';
import file from './mutations/file';

const debug = process.env.NODE_ENV !== 'production'

const state = {		
	auth: {
		_id: '',
		name:'',
		email: ''
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
			state.auth = user;
		},
		[LOGOUT] (state){
			state.auth = {
				_id: '',
				name:'',
				email: ''
			};
		},
		[AUTHORIZED] (state, user){
			if(!user){
				state.auth = {
					_id: '',
					name:'',
					email: ''
				};
			}else{
				state.auth = user;
			}
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
		post,
		user,
		file
	},
	// strict: debug,
	// plugins
});

export default store;