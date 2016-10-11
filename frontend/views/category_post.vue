<template>
	<div>
		<div class="posts">			

			<post v-for="post in posts" :post="post"></post>

		</div>

		<pagination :page="page" :total-page="totalPage" :action="getPostsByCagegory"></pagination>


	</div>
</template>

<script>

	import Pagination from '../components/pagination';
	import Post from '../components/post_item';		

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
		components:{
			Pagination,
			Post					
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