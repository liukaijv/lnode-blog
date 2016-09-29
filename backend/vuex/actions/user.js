import { 
	ALERT,
	USER_INDEX,
	USER_CREATE,
	USER_STORE,
	USER_EDIT,
	USER_UPDATE,
	USER_DELETE
} from '../mutation-types';

import http from '../../api/http';

export const indexAction = function(store, page=1) {	
	http.get('user', {params: {page : page}}).then(function(result){
		var data = result.data;
		if(data.success == true){
			store.dispatch('USER_INDEX', data.users, data.page, data.total_page);
		}else{
			store.dispatch('ALERT', {type: 'danger', msg: data.msg});
		}
	});
}

export const createAction = function(store){	
	store.dispatch('USER_CREATE');	
}

export const storeAction = function(store, data){	
	http.post('user/create', data).then(function(result){
		var data = result.data;
		if(data.success == true){
			store.dispatch('USER_STORE');
			store.router.go('/user/index');	
		}else{
			store.dispatch('ALERT', {type: 'danger', msg: data.msg});
		}
	});
}

export const editAction = function(store){	
	let user_id = store.state.route.params.user_id;
	if(!user_id){
		store.dispatch('ALERT', {type: 'danger', msg: '数据不存在'});
	}
	http.get('user/'+user_id+'/edit').then(function(result){
		let data = result.data;
		if(data.success == true){
			store.dispatch('USER_EDIT', data.user);			
		}else{
			store.dispatch('ALERT', {type: 'danger', msg: data.msg});
		}
	});	
}

export const updateAction = function(store, data){	
	let user_id = store.state.route.params.user_id;
	if(!user_id){
		store.dispatch('ALERT', {type: 'danger', msg: '数据不存在'});
	}
	http.put('user/'+user_id+'/edit', data).then(function(result){
		let data = result.data;
		if(data.success == true){
			if(data.logout){
				store.dispatch('LOGOUT');
				store.router.go('/login');	
			}			
			store.dispatch('USER_UPDATE');
			store.dispatch('ALERT', {type: 'info', msg: data.msg});							
		}else{
			store.dispatch('ALERT', {type: 'danger', msg: data.msg});
		}
	});	
}

export const deleteAction = function(store, id){	
	return new Promise(function(resolve, reject){
		http.delete('user/'+id).then(function(result){
			var data = result.data;
			if(data.success == true){
				store.dispatch('USER_DELETE');
				resolve()			
			}else{				
				store.dispatch('ALERT', {type: 'danger', msg: data.msg});
				reject()
			}
		});	
	});
}