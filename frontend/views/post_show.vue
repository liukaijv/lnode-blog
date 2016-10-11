<template>
	<div class="posts">

		<div class="post">
			<h2 class="post-title">
				<a>{{post.title}}</a>
			</h2>
			<div class="post-meta">
				<span>{{post.created_at | date_format 'YYYY-MM-DD'}} · </span>
				<span v-if="post.category"><a href="#">{{post.category.name}}</a> · </span>
				<span>{{post.hits}} Views · </span>
				<span>{{post.comments}} Replies</span>
			</div>
			<div class="post-body">
				<div class="post-thumbnail"></div>
				<div class="post-content markdown-body">					
					{{{post.content}}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	import Pagination from '../components/pagination';		

	export default {	
		ready(){
			this.getPost();
		},	
		data(){
			return {
				post: {}				
			}
		},
		watch: {
			 $route() {
			 	this.getPost();
			 }
		},
		components:{
			Pagination					
		},
		methods: {
			getPost(){								
				this.$http.get('post/' + this.$route.params.slug).then((result)=>{
					let data = result.data;
					if(data.success){
						this.post = data.post;						
					}
				});
			}
		}
	}

</script>