<template>
	
		<div class="archive-item" v-for="(yearMonth, posts) in archive" v-if="archive">
			<h3>{{yearMonth}} <small>({{posts.length}})</small></h3>
			<ul v-if="posts">
				<li v-for="post in posts">
					<a v-link="{name: 'post_show', params: {slug: post.slug }}">{{post.title}}</a>	
				</li>
			</ul>				
		</div>
	
	<empty v-else></empty>
</template>

<script>

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