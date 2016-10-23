<template>
	<div class="loading" v-show="show">
		<i class="lb-icon-spinner"></i>
	</div>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: true
			}
		}
	}
</script>