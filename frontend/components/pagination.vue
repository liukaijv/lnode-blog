<template>
	<div class="paginate-container" v-if="isShow">
		<div class="pagination">
			<a v-if="showPrev" @click="action(page-1)">&laquo;</a>
			<a v-for="i in pages" :class="{active : page == i}" @click="action(i)">{{i}}</a>
			<a v-if="showNext" @click="action(page+1)">&raquo;</a>
		</div>
	</div>
</template>

<script>

	export default {		
		props: {			
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
				default: 5
			},
			action: {
				type: Function,
				default: (page)=>{console.log(page)}
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