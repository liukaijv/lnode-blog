<template>
	<div>	
		<section class="content">
			<div class="row">
				<div class="col-md-12">
					<div class="box">
						<div class="box-header">
							<h3 class="box-title">标签列表</h3>
							<div class="pull-right box-tools">
								<a class="btn btn-primary btn-sm" v-link="{name:'tag_create'}">
									<i class="fa fa-plus"></i>
								</a>
							</div>
						</div>
						<div class="box-body">
							<table class="table table-hover" v-if="tags.length">
								<thead>
									<tr>									
										<th>名称</th>																		
										<th>创建时间</th>										
										<th>操作</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="item in tags">
										<td>{{item.name}}</td>									
										<td>{{item.created_at | date_format}}</td>										
										<td>
											<a v-link="{name:'tag_edit', params:{tag_id: item._id}}">编辑</a>
											<a @click="deleteData(item._id)">删除</a>
										</td>
									</tr>
								</tbody>
							</table>
							<div v-else>没有数据</div>
						</div>
						<div class="box-footer clearfix">
							<pagination :page="page" :total-page="total_page" :module="'tag'"></pagination>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>

	import {indexAction, deleteAction} from '../../vuex/actions/tag';
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
				tags: ({tag}) => tag.tags,
				page: ({tag}) => tag.page,				
				total_page: ({tag}) => tag.total_page							
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