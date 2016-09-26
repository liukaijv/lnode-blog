import { 
	PAGE_CHANGE
} from '../mutation-types';

export const pageAction = function(store, module, page){	
	store.dispatch('PAGE_CHANGE', module, page);		
}