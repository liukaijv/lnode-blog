<template>
	<div class="post">
		<h2 class="post-title">
			<a v-link="{name: 'post_show', params: {slug: post.slug }}">{{post.title}}</a>
		</h2>
		<div class="post-meta">
			<span>{{post.created_at | date_format 'YYYY-MM-DD'}} · </span>	
			<span v-if="post.category && post.category.slug">
				<a v-link="{name: 'category_post', params: {slug: post.category.slug }}">{{post.category.name}}</a> · 
			</span>		
			<span>{{post.hits}} Views · </span>
			<span>{{post.comments}} Replies</span>
		</div>
		<div class="post-body">
			<div class="post-thumbnail"></div>
			<div class="post-content">
				<template v-if="post.summary">{{{post.summary}}}</template>
				<template v-else>{{{post.content | strip_tags | sub_str '250' true}}}</template>
			</div>
		</div>
	</div>
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