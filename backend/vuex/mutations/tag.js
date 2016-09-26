import { 
	TAG_INDEX,
	TAG_CREATE,
	TAG_STORE,
	TAG_EDIT,
	TAG_UPDATE,
	TAG_DELETE
} from '../mutation-types';

const state = {	
	tags: [],
	entity: {
		name: '',
		slug: ''		
	},
	page: 1,
	total_page: 1
}

const mutations = {
	[TAG_INDEX] (state, tags, page, total_page) {			
		state.tags = tags;
		state.page = page;		
		state.total_page = total_page;
	},
	[TAG_CREATE] (state) {	
		state.entity = 	{
			name: '',
			slug: ''
		};	
	},
	[TAG_STORE] (state) {	
		
	},
	[TAG_EDIT] (state, tag) {	
		state.entity = {
			name: tag.name,
			slug: tag.slug
		};
	},
	[TAG_UPDATE] (state) {	
		
	},
	[TAG_DELETE] (state) {
		
	}
}

export default {
	state,
	mutations
}