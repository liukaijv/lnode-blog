import { 
	CATEGORY_INDEX,
	CATEGORY_CREATE,
	CATEGORY_STORE,
	CATEGORY_EDIT,
	CATEGORY_UPDATE,
	CATEGORY_DELETE
} from '../mutation-types';

const state = {	
	categories: [],
	entity: {
		name: '',
		slug: '',
		parent: '',
		is_nav: false
	},
	page: 1,
	total_page: 1
}

const mutations = {	
	[CATEGORY_INDEX] (state, categories, page, total_page) {		
		state.categories = categories;
		state.page = page;		
		state.total_page = total_page;
	},
	[CATEGORY_CREATE] (state, categories) {		
		state.categories = categories,
		state.entity = 	{
				name: '',
				slug: '',
				parent: '',
				is_nav: false
			};	
	},
	[CATEGORY_STORE] (state) {	
			
	},
	[CATEGORY_EDIT] (state, categories, category) {		
		state.categories = categories;
		state.entity = {
			name: category.name,
			slug: category.slug,
			parent: category.parent ? category.parent : '',
			is_nav: category.is_nav
		};
	},
	[CATEGORY_UPDATE] (state) {	
		
	},
	[CATEGORY_DELETE] (state) {
		
	}
}

export default {
	state,
	mutations
}