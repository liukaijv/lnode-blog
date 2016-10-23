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
			this.getPosts();
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
				this.getPosts();
			}
		},
		methods: {
			getPosts(page=1){
				let query = {page: page, keyword: this.$route.query.keyword};	
				if(this.page != page || query.keyword){
					query = Object.assign(query, {no_cache: true});
				}								
				this.$http.get('posts', {params: query}).then((result)=>{					
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