import date_format from './date_format';
import sub_str from './sub_str';
import strip_tags from './strip_tags';

export default function(Vue){	
	
	Vue.filter('date_format', date_format);
	Vue.filter('sub_str', sub_str);
	Vue.filter('strip_tags', strip_tags);

}