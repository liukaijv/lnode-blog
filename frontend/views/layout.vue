<template>
	<div>		
		<blog-header :menus="menus"></blog-header>
		<div class="container content">
			<main>
				<router-view></router-view>
			</main>	
			<blog-aside></blog-aside>		
		</div>
		<blog-footer></blog-footer>
	</div>
</template>

<script>

	import BlogHeader from './common/header';
	import BlogFooter from './common/footer';
	import BlogAside from './common/aside';

	export default {

		ready(){
			this.getMenus();
		},

		data(){
			return {
				menus: []
			}
		},

		components:{
			BlogHeader,
			BlogFooter,
			BlogAside
		},

		methods: {
			getMenus(){
				this.$http.get('menus').then((result)=>{
					let data = result.data;
					if(data.success){
						this.menus = data.menus;
					}
				})
			}
		}	
	}

</script>