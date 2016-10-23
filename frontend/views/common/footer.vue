<template>
	<footer>
		<div class="container">
			<p>
				&copy; 2016 Noop all rights reserved.
				<a href="/rss" title="rss"><i class="lb-icon-rss"></i></a>
				<a class="f12" @click="clearCache">清除缓存</a>
			</p>
		</div>
	</footer>
</template>
<script>
	export default {
		methods: {
			clearCache(){
				this.$root.showLoading = true;				
				setTimeout(()=>{
					this.$cache.flush();
					this.$root.showLoading = false;					
					console.log('缓存已清除');
				}, Math.floor(Math.random() * 1000));	
			}
		}
	}
</script>