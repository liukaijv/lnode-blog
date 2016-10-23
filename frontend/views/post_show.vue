<template>
	<div class="post">
		<h2 class="post-title">
			{{post.title}}
		</h2>
		<post-meta :post="post"></post-meta>
		<div class="post-blockquote">{{post.summary}}</div>
		<div class="post-body">
			<div class="post-thumbnail"></div>
			<div class="post-content markdown-body">					
				{{{post.content}}}
			</div>
		</div>
	</div>
	<post-tag :tags="post.tags"></post-tag>
	<div class="gutter" v-if="prev || next">
		<div v-if="prev" class="post-prev">
			上一篇：<a v-link="{name: 'post_show', params: {slug: prev.slug }}">{{prev.title}}</a>
		</div>

		<div v-if="next" class="post-next">
			下一篇：<a v-link="{name: 'post_show', params: {slug: next.slug }}">{{next.title}}</a>
		</div>
	</div>	
</template>

<script>

	export default {	
		created(){
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