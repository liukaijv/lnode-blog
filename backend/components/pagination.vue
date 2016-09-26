<template>
	<nav class="pull-right" v-show="isShow">
		<ul class="pagination">
			<li v-if="showPrev" @click="pageAction(module, page-1)"><a>&laquo;</a></li>
			<li v-for="i in pages" :class="{active : page == i}" @click="pageAction(module, i)">
				<a>{{i}}</a>
			</li>			
			<li v-if="showNext" @click="pageAction(module, page+1)"><a>&raquo;</a></li>
		</ul>
	</nav>
</template>

<script>
	import {pageAction} from '../vuex/actions/common';

	export default {		
		props: {
			module: {
				required: true,
				type: String
			},
			page: {
				required: true,
				type: Number,
				default: 1
			},
			totalPage: {
				required: true,
				type: Number
			},
			showSize: {
				type: Number,
				default: 10
			}			
		},
		vuex: {
			actions: {
				pageAction
			}
		},
		computed: {
			isShow(){	
				return this.totalPage > 1;
			},
			pages(){				
				let totalPage = this.totalPage,
				currentPage = this.page,
				showSize = this.showSize,				 	
				left = 1,
				right = totalPage,
				pageArr = [];
				if(totalPage > showSize){
					let halfLeft = Math.floor((showSize - 1) / 2);
					let halfRight = Math.ceil((showSize - 1) / 2);                   
					if (currentPage > halfRight && currentPage < totalPage - halfLeft) {
						left = currentPage - halfRight;
						right = currentPage + halfLeft;
					} else {
						if (currentPage <= halfRight) {
							left = 1;
							right = showSize;
						} else {
							right = totalPage;
							left = totalPage - (showSize - 1);
						}
					}
				}
				while (left <= right) {
					pageArr.push(left)
					left++
				}
				return pageArr;
			},
			showPrev(){
				return this.page > 1;
			},
			showNext(){
				return this.page < this.totalPage;
			}
		}
	}
</script>