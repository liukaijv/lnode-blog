import { 
	ALERT,
	POST_INDEX,
	POST_CREATE,
	POST_STORE,
	POST_EDIT,
	POST_UPDATE,
	POST_DELETE,
	POST_UPLOAD_COVER,
	POST_DELETE_COVER,
	POST_EDITOR,
	POST_UPLOAD_ATTACHMENT,
	POST_DELETE_ATTACHMENT,
} from '../mutation-types';

import http from '../../api/http';
import {uploadAction} from './common';

export const indexAction = function(store, page=1) {

	http.get('post', {params: {page : page}}).then(function(result){
		var data = result.data;
		if(data.success == true){
			store.dispatch('POST_INDEX', data.posts, data.page, data.total_page);
		}else{
			store.dispatch('ALERT', {type: 'danger', msg: data.msg});
		}
	});

}

export const createAction = function(store){	
	http.get('post/create').then(function(result){
		var data = result.data;
		if(data.success == true){
			store.dispatch('POST_CREATE', data.categories, data.tags);				
		}else{
			store.dispatch('ALERT', {type: 'danger', msg: data.msg});
		}
	});
}

export const storeAction = function(store, data){
	http.post('post/create', data).then(function(result){
		var data = result.data;
		if(data.success == true){
			store.dispatch('POST_STORE');
			store.router.go('/post/index');	
		}else{
			store.dispatch('ALERT', {type: 'danger', msg: data.msg});
		}
	});
}

export const editAction = function(store){	
	let post_id = store.state.route.params.post_id;
	if(!post_id){
		store.dispatch('ALERT', {type: 'danger', msg: '数据不存在'});
	}
	http.get('post/'+post_id+'/edit').then(function(result){
		let data = result.data;
		if(data.success == true){
			store.dispatch('POST_EDIT', data.post, data.categories, data.tags);			
		}else{
			store.dispatch('ALERT', {type: 'danger', msg: data.msg});
		}
	});	
}

export const updateAction = function(store, data){	
	let post_id = store.state.route.params.post_id;
	if(!post_id){
		store.dispatch('ALERT', {type: 'danger', msg: '数据不存在'});
	}
	http.put('post/'+post_id+'/edit', data).then(function(result){
		let data = result.data;
		if(data.success == true){
			store.dispatch('POST_UPDATE');
			store.router.go('/post/index');			
		}else{
			store.dispatch('ALERT', {type: 'danger', msg: data.msg});
		}
	});	
}

export const deleteAction = function(store, id){	
	return new Promise(function(resolve, reject){
		http.delete('post/'+id).then(function(result){
			var data = result.data;
			if(data.success == true){
				store.dispatch('POST_DELETE');
				resolve()			
			}else{				
				store.dispatch('ALERT', {type: 'danger', msg: data.msg});
				reject()
			}
		});	
	});
}

export const uploadCoverAction = function(store, files){	
	if (files.length > 0) {        
        uploadAction(files[0]).then(function(result){
        	store.dispatch(POST_UPLOAD_COVER, result.url);
        });         
    } else {  
        store.dispatch('ALERT', {type: 'danger', msg: '没有选择文件'});
    }
}

export const deleteCoverAction = function(store, file){	
    store.dispatch(POST_DELETE_COVER);
}

export const editorAction = function(store, text){	
    store.dispatch(POST_EDITOR, text);
}

export const uploadAttachmentAction = function(store, files){	
	if (files.length > 0) {        
        uploadAction(files[0]).then(function(result){
        	store.dispatch(POST_UPLOAD_ATTACHMENT, result.url);
        });         
    } else {  
        store.dispatch('ALERT', {type: 'danger', msg: '没有选择文件'});
    }
}

export const deleteAttachmentAction = function(store, file){	
    store.dispatch(POST_DELETE_ATTACHMENT);
}