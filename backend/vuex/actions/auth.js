import { 
	LOGIN,
	LOGOUT,
	AUTHORIZED
} from '../mutation-types';

import http from '../../api/http';

export const loginAction = function(store, data){
	http.post('login', data).then(function(result){		
		var data = result.data;
		if(data.success == true){
			sessionStorage.setItem('jwt_token', data.user.access_token);	
			sessionStorage.setItem('auth_user', JSON.stringify(data.user));	
			store.dispatch(LOGIN, data.user);	
			store.router.go('/main');			
		}else{
			store.dispatch('ALERT', {type:'danger', msg: data.msg});
		}
	});
}

export const logoutAction = function(store){
	http.post('logout').then(function(result){
		var data = result.data;
		if(data.success == true){
			sessionStorage.removeItem('jwt_token');	
			sessionStorage.removeItem('auth_user');	
			store.dispatch(LOGOUT, data.categories);
			store.router.go('/login');
		}
	});
}

export const authorizedAction = function(store){
	var auth_user = null;
	var session_user = sessionStorage.getItem('auth_user');
	var jwt_token = sessionStorage.getItem('jwt_token');	
	if(session_user){
		auth_user = JSON.parse(session_user)
	}
	store.dispatch(AUTHORIZED, auth_user);
	if(!auth_user || !jwt_token){
		store.router.go('/login');		
	}
}