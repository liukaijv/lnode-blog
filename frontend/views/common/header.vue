<template>
	<header>
		<div class="container">
			<h1 class="logo">
				<a v-link="{name: 'index' }">lblog</a>
			</h1>				
			<nav class="menu" id="nav">
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
			<div class="toggle-menu">
				<a class="menu-icon" id="toggle-nav">
					<i class="lb-icon-list"></i>
				</a>
			</div>
		</div>
		
	</header>
</template>

<script>
	export default {
		ready(){
			document.getElementById('toggle-nav').addEventListener('click', ()=>{				
				document.getElementById('nav').classList.toggle('opened');
			});
		},
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