import { 
	ALERT,
	TAG_INDEX,
	TAG_CREATE,
	TAG_STORE,
	TAG_EDIT,
	TAG_UPDATE,
	TAG_DELETE
} from '../mutation-types';

import http from '../../api/http';

export const indexAction = function(store, page=1) {	
	http.get('tag', {params: {page : page}}).then(function(result){
		var data = result.data;
		if(data.success == true){
			store.dispatch('TAG_INDEX', data.tags, data.page, data.total_page);
		}else{
			store.dispatch('ALERT', {type: 'danger', msg: data.msg});
		}
	});
}

export const createAction = function(store){	
	store.dispatch('TAG_CREATE');	
}

export const storeAction = function(store, data){	
	http.post('tag/create', data).then(function(result){
		var data = result.data;
		if(data.success == true){
			store.dispatch('TAG_STORE');
			store.router.go('/main/tag/index');	
		}else{
			store.dispatch('ALERT', {type: 'danger', msg: data.msg});
		}
	});
}

export const editAction = function(store){	
	let tag_id = store.state.route.params.tag_id;
	if(!tag_id){
		store.dispatch('ALERT', {type: 'danger', msg: '数据不存在'});
	}
	http.get('tag/'+tag_id+'/edit').then(function(result){
		let data = result.data;
		if(data.success == true){
			store.dispatch('TAG_EDIT', data.tag);			
		}else{
			store.dispatch('ALERT', {type: 'danger', msg: data.msg});
		}
	});	
}

export const updateAction = function(store, data){	
	let tag_id = store.state.route.params.tag_id;
	if(!tag_id){
		store.dispatch('ALERT', {type: 'danger', msg: '数据不存在'});
	}
	http.put('tag/'+tag_id+'/edit', data).then(function(result){
		let data = result.data;
		if(data.success == true){
			store.dispatch('TAG_UPDATE');
			store.router.go('/main/tag/index');			
		}else{
			store.dispatch('ALERT', {type: 'danger', msg: data.msg});
		}
	});	
}

export const deleteAction = function(store, id){	
	return new Promise(function(resolve, reject){
		http.delete('tag/'+id).then(function(result){
			var data = result.data;
			if(data.success == true){
				store.dispatch('TAG_DELETE');
				resolve()			
			}else{				
				store.dispatch('ALERT', {type: 'danger', msg: data.msg});
				reject()
			}
		});	
	});
}