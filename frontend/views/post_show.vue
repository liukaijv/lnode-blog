<template>
	

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

		<div class="gutter" v-if="prev || next">
			<div v-if="prev">
				上一篇：<a v-link="{name: 'post_show', params: {slug: prev.slug }}">{{prev.title}}</a>
			</div>

			<div v-if="next">
				下一篇：<a v-link="{name: 'post_show', params: {slug: next.slug }}">{{next.title}}</a>
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
				post: {},
				prev: {},
				next: {}

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
						this.prev = data.prev;						
						this.next = data.next;						
					}
				});
			}
		}
	}

</script>