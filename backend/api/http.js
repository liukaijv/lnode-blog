import axios from 'axios';

let instance = axios.create({
	baseURL: '/backend'
});

instance.interceptors.request.use(function (config) {
	let access_token = sessionStorage.getItem('jwt_token');	
	if (access_token !== null && access_token !== 'undefined') {
		config.headers.access_token = access_token;
	}		
	return config;
}, function (error) {	
	console.log(error)	
	return Promise.reject(error);
});


instance.interceptors.response.use(function (response) {
	return response;
}, function (error) {
	console.log(error)
	return Promise.reject(error);
});

export default instance;