import { 	
	CONFIRM_SHOW,
	CONFIRM_HIDE
} from '../mutation-types';

export const showAction = function(store, msg, callbackOk, callbackCancel){	
	store.dispatch('CONFIRM_SHOW', msg, callbackOk, callbackCancel);		
}

export const hideAction = function(store){	
	store.dispatch('CONFIRM_HIDE');	
}