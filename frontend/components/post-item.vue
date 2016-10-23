<template>
	<div class="post">
		<h2 class="post-title">
			<a v-link="{name: 'post_show', params: {slug: post.slug }}">{{post.title}}</a>
		</h2>
		<post-meta :post="post"></post-meta>
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
			referer: {
				type: String
			},
			post: {
				type: Object,
				default: ()=>{
					return {};
				}
			}
		}
	}
</script>