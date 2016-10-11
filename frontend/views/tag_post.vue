<template>
	<div>
		<div class="posts">			

			<post v-for="post in posts" :post="post"></post>

		</div>

		<pagination :page="page" :total-page="totalPage" :action="getPostsByTag"></pagination>


	</div>
</template>

<script>

	import Pagination from '../components/pagination';
	import Post from '../components/post_item';	

	export default {	
		created(){	
			this.getPostsByTag();
		},	
		data(){
			return {				
				posts: [],
				page: 1,
				totalPage: 1
			}
		},
		components:{
			Pagination,
			Post					
		},
		watch: {
			 $route() {
			 	this.getPostsByTag();
			 }
		},
		methods: {
			getPostsByTag(page=1){							
				this.$http.get('tag/' + this.$route.params.slug, {params: {page: page}}).then((result)=>{
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