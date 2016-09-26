<template>
	<div class="login-page">
	    <div class="login-box">
	        <div class="login-box-body">
	            <form @submit.prevent="doLogin">
	                <p class="login-box-msg">Sign in to start your session</p>
	                <div class="form-group has-feedback">
	                    <input type="text" class="form-control" required="" placeholder="账户" v-model="name">
	                    <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
	                </div>
	                <div class="form-group has-feedback">
	                    <input type="password" class="form-control" required="" placeholder="密码" v-model="password">
	                    <span class="glyphicon glyphicon-lock form-control-feedback"></span>
	                </div>
	                <div class="row">
	                    <div class="col-xs-8"></div>
	                    <div class="col-xs-4">
	                        <button class="btn btn-primary btn-block btn-flat">登录</button></div>
	                </div>
	            </form>
	        </div>
	    </div>
	</div>	   
</template>

<script>
import { loginAction } from '../vuex/actions/auth';

export default {			
	data(){
		return {
			name: '',
			password: ''
		}
	},		
	vuex: {
		actions: {
			loginAction			
		},
		getters: {
			user: state => state.user,
			alert: state => state.alert,			
		}
	},	
	methods:{
		doLogin(){
			this.loginAction({name: this.name, password: this.password})
		}
	}
}
</script>