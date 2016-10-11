<template>
	<aside>
		<div class="widget" v-if="hot_posts">
			<h3>热门文章</h3>
			<ul class="list">
				<li v-for="post in hot_posts">
					<a v-link="{name: 'post_show', params: {slug: post.slug }}">{{post.title}}</a>					
				</li>
			</ul>			
		</div>
		<div class="widget" v-if="categories">
			<h3>所有分类</h3>
			<ul class="list">
				<li v-for="category in categories">
					<a v-link="{name: 'category_post', params: {slug: category.slug }}">{{category.name}}</a>
					<ul v-for="category in category.children">
						<li>
							<a v-link="{name: 'category_post', params: {slug: category.slug }}">{{category.name}}</a>
						</li>
					</ul>
				</li>
			</ul>			
		</div>	
		<div class="widget" v-if="tags">
			<h3>热门标签</h3>
			<ul class="list-inline">
				<li v-for="tag in tags">
					<a v-link="{name: 'tag_post', params: {slug: tag.slug }}">{{tag.name}} <span>({{tag.post_count}})</span></a>
				</li>
			</ul>			
		</div>	
	</aside>
</template>

<script>
	export default {
		ready(){
			this.$http.get('hot_posts').then((result)=>{
				let data = result.data;
				if(data.success){
					this.hot_posts = data.hot_posts;					
				}
			});
			this.$http.get('tags').then((result)=>{
				let data = result.data;
				if(data.success){
					this.tags = data.tags;					
				}
			});
			this.$http.get('categories').then((result)=>{
				let data = result.data;
				if(data.success){
					this.categories = data.categories;					
				}
			})
		},
		data(){
			return {
				hot_posts: [],
				tags: [],
				categories: []
			}
		}
	}
</script>