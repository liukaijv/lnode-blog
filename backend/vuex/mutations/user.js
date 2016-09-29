import { 
	USER_INDEX,
	USER_CREATE,
	USER_STORE,
	USER_EDIT,
	USER_UPDATE,
	USER_DELETE
} from '../mutation-types';

const state = {	
	users: [],
	entity: {
		name: '',	
		nickname: '',	
		email: '',	
		password: '',	
		new_password: '',	
		repeat_password: ''	
	},
	page: 1,
	total_page: 1
}

const mutations = {
	[USER_INDEX] (state, users, page, total_page) {			
		state.users = users;
		state.page = page;		
		state.total_page = total_page;
	},
	[USER_CREATE] (state) {	
		state.entity = 	{
			name: '',	
			nickname: '',	
			email: '',	
			password: '',	
			new_password: '',	
			repeat_password: ''	
		};	
	},
	[USER_STORE] (state) {	
		
	},
	[USER_EDIT] (state, user) {	
		state.entity = 	{
			name: user.name,	
			nickname: user.nickname,	
			email: user.email,	
			password: '',	
			new_password: '',	
			repeat_password: ''	
		};	
	},
	[USER_UPDATE] (state) {	
		state.entity.password = '';
		state.entity.new_password = '';
		state.entity.repeat_password = '';
	},
	[USER_DELETE] (state) {
		
	}
}

export default {
	state,
	mutations
}