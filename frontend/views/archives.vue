<template>
	<div>
		<div class="posts">			

			<div class="archive-item" v-for="(yearMonth, posts) in archive">
				<h3>{{yearMonth}}</h3>
				<ul>
					<li v-if="posts" v-for="post in posts">
						<a v-link="{name: 'post_show', params: {slug: post.slug }}">{{post.title}}</a>	
					</li>
				</ul>				
			</div>

		</div>		

	</div>
</template>

<script>
	
	import Post from '../components/post_item';	

	export default {	
		created(){	
			this.getPosts();
		},	
		data(){
			return {				
				archive: [],
				page: 1,
				totalPage: 1
			}
		},
		components:{			
			Post					
		},
		watch: {
			$route() {
				this.getPosts();
			}
		},
		methods: {
			getPosts(){							
				this.$http.get('archives').then((result)=>{
					let data = result.data;
					if(data.success){
						this.archive = data.archive;						
					}else{
						this.archive = [];
					}
				});
			}
		}
	}

</script>