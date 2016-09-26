import { 
	ALERT,
	ALERT_HIDE
} from '../mutation-types';

export const alertAction = function(store, info){	
	store.dispatch('ALERT', info);		
}

export const hideAction = function(store){	
	store.dispatch('ALERT_HIDE');	
}