import { 
	ALERT,
	CATEGORY_INDEX,
	CATEGORY_CREATE,
	CATEGORY_STORE,
	CATEGORY_EDIT,
	CATEGORY_UPDATE,
	CATEGORY_DELETE
} from '../mutation-types';

import http from '../../api/http';

export const indexAction = function(store, page=1) {	
	http.get('category', {params: {page : page}}).then(function(result){
		var data = result.data;
		if(data.success == true){
			store.dispatch('CATEGORY_INDEX', data.categories, data.page, data.total_page);
		}else{
			store.dispatch('ALERT', {type: 'danger', msg: data.msg});
		}
	});

}

export const createAction = function(store){
	http.get('category/create').then(function(result){
		var data = result.data;
		if(data.success == true){
			store.dispatch('CATEGORY_CREATE', data.categories);
		}else{
			store.dispatch('ALERT', {type: 'danger', msg: data.msg});
		}
	});
}

export const storeAction = function(store, data){	
	http.post('category/create', data).then(function(result){
		var data = result.data;
		if(data.success == true){
			store.dispatch('CATEGORY_STORE');
			store.router.go('/main/category/index');	
		}else{
			store.dispatch('ALERT', {type: 'danger', msg: data.msg});
		}
	});
}

export const editAction = function(store){	
	var category_id = store.state.route.params.category_id;
	if(!category_id){
		store.dispatch('ALERT', {type: 'danger', msg: '数据不存在'});
	}
	http.get('category/'+category_id+'/edit').then(function(result){
		var data = result.data;
		if(data.success == true){
			store.dispatch('CATEGORY_EDIT', data.categories, data.category);			
		}else{
			store.dispatch('ALERT', {type: 'danger', msg: data.msg});
		}
	});	
}

export const updateAction = function(store, data){	
	var category_id = store.state.route.params.category_id;
	if(!category_id){
		store.dispatch('ALERT', {type: 'danger', msg: '数据不存在'});
	}
	http.put('category/'+category_id+'/edit', data).then(function(result){
		var data = result.data;
		if(data.success == true){
			store.dispatch('CATEGORY_UPDATE');
			store.router.go('/main/category/index');			
		}else{
			store.dispatch('ALERT', {type: 'danger', msg: data.msg});
		}
	});	
}

export const deleteAction = function(store, category_id){	
	return new Promise(function(resolve, reject){
		http.delete('category/'+category_id).then(function(result){
			var data = result.data;
			if(data.success == true){
				store.dispatch('CATEGORY_DELETE');
				resolve()			
			}else{				
				store.dispatch('ALERT', {type: 'danger', msg: data.msg});
				reject()
			}
		});	
	});
}