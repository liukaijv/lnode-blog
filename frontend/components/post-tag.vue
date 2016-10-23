<template>
	<div class="post-tag" v-show="tags.length">
		<i class="lb-icon-tag"></i>		
		<a class="tag-item" v-for="tag in tags" v-link="{name: 'tag_post', params: {slug: tag.slug }}">{{tag.name}}<span></a>
	</div>
</template>

<script>
	export default {		
		props: {
			tags: {
				type: Array,
				default: ()=>{
					return [];
				}
			}
		}
	}
</script>