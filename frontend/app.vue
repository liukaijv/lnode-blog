<template>
	<div>    	
		<router-view></router-view>   
		<loading :show="showLoading"></loading>      
	</div>
</template>

<script>
	import Vue from 'vue';

	export default {	
		created() {				
			Vue.http.interceptors.push((request, next)=>{
				this.showLoading = true;
				next((response)=>{
					this.showLoading = false;
				});
			});
		},
		data() {
			return {
				showLoading: false
			}
		}
	}

</script>

<style lang="sass">
	@import './scss/style.scss';
</style>