import { 
	DASHBOARD
} from '../mutation-types';

import http from '../../api/http';

export function dashboardAction(store){
	http.get('dashboard').then(function(result){
		var data = result.data;
		if(data.success == true){
			store.dispatch('DASHBOARD', data.post_count, data.tag_count, data.category_count);
		}else{
			store.dispatch('ALERT', {type: 'danger', msg: data.msg});
		}
	});
}