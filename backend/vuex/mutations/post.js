import { 
	POST_INDEX,
	POST_CREATE,
	POST_STORE,
	POST_EDIT,
	POST_UPDATE,
	POST_DELETE,
	POST_TAGS,
	POST_UPLOAD_COVER,
	POST_CANCEL_COVER,
	POST_EDITOR
} from '../mutation-types';

const state = {	
	posts: [],
	categories: [],
	tags: [],
	entity: {
		title: '',
		slug: '',
		category: '',
		tags: [],
		author: '',
		cover_image: '',
		summary: '',
		content: '',
		content_raw: '',
		is_markdown: true,
		is_hidden: false	
	},
	page: 1,
	total_page: 1
}

const mutations = {
	[POST_INDEX] (state, posts, page, total_page) {			
		state.posts = posts;
		state.page = page;		
		state.total_page = total_page;
	},
	[POST_CREATE] (state, categories, tags) {	
		state.entity = 	{
				title: '',
				slug: '',
				category: '',
				tags: [],
				author: '',
				cover_image: '',
				summary: '',
				content: '',
				content_raw: '',
				is_markdown: true
			};	
		state.categories = categories;
		state.tags = tags;
	},
	[POST_STORE] (state) {	
			
	},
	[POST_EDIT] (state, post, categories, tags) {	
		state.entity = {
			title: post.title,
			slug: post.slug,
			category: post.category?post.category:'',
			tags: post.tags?post.tags:[],
			author: post.author,
			summary: post.summary,
			cover_image: post.cover_image || '',
			content: post.content,
			content_raw: post.content_raw,
			is_markdown: post.is_markdown,
			is_hidden: post.is_hidden
		};
		state.categories = categories;
		state.tags = tags;
	},
	[POST_UPDATE] (state) {	
		
	},
	[POST_DELETE] (state) {
		
	},
	[POST_UPLOAD_COVER](state, url){
		state.entity.cover_image = url;
	},
	[POST_CANCEL_COVER](state){
		state.entity.cover_image = '';
	},
	[POST_EDITOR](state, text){
		state.entity.content_raw = text;
	}
}

export default {
	state,
	mutations
}