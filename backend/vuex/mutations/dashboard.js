import { 
	DASHBOARD
} from '../mutation-types';

const state = {
	post_count: 0,
	tag_count: 0,
	category_count: 0
}

const mutations = {
	[DASHBOARD] (state, post_count, tag_count, category_count) {			
		state.post_count = post_count;
		state.tag_count = tag_count;
		state.category_count = category_count;
	}
}

export default {
	state,
	mutations
}