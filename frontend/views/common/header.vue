<template>
	<header>
		<div class="container">
			<h1 class="logo">
				<a v-link="{name: 'index' }">lnode</a>
			</h1>				
			<nav class="menu">
				<ul>
					<li v-for="menu in menus">
						<a v-link="{name: 'category_post', params: {slug: menu.slug }}">{{menu.name}}</a>
					</li>		
					<li>
						<a v-link="{name: 'archives'}">归档</a>
					</li>			
				</ul>
			</nav>
			<form class="search-form" @submit.prevent="$route.router.go({name: 'index', query: {keyword: keyword }})">
				<input type="type" placeholder="" v-model="keyword">
				<button><i class="lb-icon-search"></i></button>
			</form>
		</div>
		
	</header>
</template>

<script>
	export default {
		props: {
			menus: {
				required: true,
				type: Array
			}
		},
		data(){
			return {
				keyword: ''
			}
		}
	}
</script>