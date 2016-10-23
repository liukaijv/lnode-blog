<template>
	<div class="empty-data">
		<div class="empty-content">
			<p><i class="lb-icon-frown"></i></p>
			<p>{{text}}</p>	
		</div>	
	</div>
</template>
<script>
	export default {
		props: {
			text: {
				type: String,
				default: '哎呀，数据还没有造！'
			}
		}
	}
</script>