<template>
    <div>
    	<alert v-show="alertShow" :type="alert.type" :msg="alert.msg" :close="hideAction"></alert>
    	<confirm v-show="confirm.show" :ok="confirm.onOk" :cancel="confirm.onCancel" :msg="confirm.msg"></confirm>
        <router-view></router-view>         
    </div>
</template>

<script>
import store from './vuex/store';
import Alert from './components/common/alert';
import Confirm from './components/common/confirm';
import {alertAction, hideAction} from './vuex/actions/alert';

export default {	
	store,
	vuex: {
		actions: {
			alertAction,
			hideAction	
		},
		getters: {	
			alert: (state) => state.alert,
			confirm: (state) => state.confirm			
		}
	},
	components:{
		Alert,
		Confirm
	},
	computed:{
		alertShow(){
			return this.alert.msg != '';
		}
	},
	methods:{
		doLogin(){
			this.loginAction({name: this.name, password: this.password})
		}
	}				
}
</script>