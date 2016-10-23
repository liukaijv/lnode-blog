import Pagination from './pagination';
import PostMeta from './post-meta';
import PostItem from './post-item';
import PostTag from './post-tag';
import Empty from './empty';
import Loading from './loading';

export default function(Vue){
	Vue.component('post-tag', PostTag);
	Vue.component('post-meta', PostMeta);
	Vue.component('post', PostItem);
	Vue.component('pagination', Pagination);
	Vue.component('empty', Empty);
	Vue.component('loading', Loading);
}