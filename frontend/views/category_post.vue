<template>		
	<template v-if="posts.length">
		<post v-for="post in posts" :post="post"></post>
	</template>
	<empty v-else></empty>
	<pagination :page="page" :total-page="totalPage" :action="getPosts"></pagination>
</template>

<script>

	export default {	
		created(){	
			this.getPostsByCagegory();
		},	
		data(){
			return {				
				posts: [],
				page: 1,
				totalPage: 1
			}
		},
		watch: {
			$route() {
				this.getPostsByCagegory();
			}
		},
		methods: {
			getPostsByCagegory(page=1){										
				this.$http.get('category/' + this.$route.params.slug, {params: {page: page}}).then((result)=>{
					let data = result.data;
					if(data.success){
						this.posts = data.posts;
						this.page = data.page;
						this.totalPage = data.total_page;
					}else{
						this.posts = [];
					}
				});
			}
		}
	}

</script>