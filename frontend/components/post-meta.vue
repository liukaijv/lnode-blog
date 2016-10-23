<template>	
	<ul class="post-meta">		
		<li v-if="post.category && post.category.slug">
			分类：<a v-link="{name: 'category_post', params: {slug: post.category.slug }}">{{post.category.name}}</a> · 
		</li>
		<li>
			发表于<span>{{post.created_at | date_format 'YYYY年MM月DD日'}} · </span>	
		</li>
		<!-- <li>
			by <span>{{post.author}} · </span>
		</li> -->
		<li>
			被浏览<span>{{post.hits}}</span>次
		</li>	
	</ul>		
</template>
<script>
	export default {
		props:{
			post: {
				type: Object,
				default: ()=>{
					return {};
				}
			}
		}
	}
</script>