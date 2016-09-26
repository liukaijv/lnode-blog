<template>
	<div>	
		<section class="content">
			<div class="row">
				<div class="col-md-12">
					<div class="box">
						<div class="box-header">
							<h3 class="box-title">分类列表</h3>
						</div>
						<div class="box-body">
							<table class="table table-hover" v-if="categories.length">
								<thead>
									<tr>									
										<th>名称</th>
										<th>上级分类</th>
										<th>菜单显示</th>
										<th>创建时间</th>										
										<th>操作</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="item in categories">
										<td>{{item.name}}</td>
										<td>{{item.parent?item.parent.name:'无'}}</td>										
										<td>
											<span class="text-primary" v-if="item.is_nav">是</span>
											<span class="text-danger" v-else>否</span>	
										</td>
										<td>{{item.created_at | date_format}}</td>										
										<td>
											<a v-link="{name:'category_edit', params:{category_id: item._id}}">编辑</a>
											<a @click="deleteData(item._id)">删除</a>
										</td>
									</tr>
								</tbody>
							</table>
							<div v-else>没有数据</div>
						</div>
						<div class="box-footer clearfix">
							<pagination :page="page" :total-page="total_page" :module="'category'"></pagination>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>

	import {indexAction, deleteAction} from '../../vuex/actions/category';		
	import {showAction as showConfirm, hideAction as hideConfirm} from '../../vuex/actions/confirm';
	import Pagination from '../../components/pagination';

	export default {
		ready(){
			this.indexAction();
		},
		vuex: {
			actions: {
				indexAction,
				deleteAction,
				showConfirm,
				hideConfirm
			},
			getters: {
				categories: ({category}) => category.categories,				
				page: ({category}) => category.page,				
				total_page: ({category}) => category.total_page				
			}
		},
		components:{
			Pagination
		},
		methods: {
			deleteData(id){
				this.showConfirm('确定要删除吗？',()=>{
					this.hideConfirm();
					this.deleteAction(id).then(()=>{
						this.indexAction();
					});
				});					
			}
		},
		watch :{
			page(){
				this.indexAction(this.page);
			}
		}	
	}
</script>