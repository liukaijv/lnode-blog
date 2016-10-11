<template>
	<div>
		<div class="posts">			

			<post v-for="post in posts" :post="post"></post>			

		</div>

		<pagination :page="page" :total-page="totalPage" :action="getPosts"></pagination>

	</div>
</template>

<script>

	import Pagination from '../components/pagination';
	import Post from '../components/post_item';		

	export default {	
		ready(){
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
		components:{
			Pagination,
			Post		
		},
		methods: {
			getPosts(page=1){					
				this.$http.get('posts', {params: {page: page, keyword: this.$route.query.keyword}}).then((result)=>{
					
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