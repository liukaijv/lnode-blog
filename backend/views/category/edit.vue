<template>
	<div>	
		<section class="content">
			<div class="row">
				<div class="col-md-12">
					<div class="box">
						<div class="box-header">
							<h3 class="box-title">分类修改</h3>
						</div>
						<div class="box-body">
							<div class="form-group">							
								<input type="text" placeholder="分类名称" class="form-control" v-model="entity.name">
							</div>
						<!-- 	<div class="form-group">							
								<input type="text" placeholder="Slug" class="form-control" v-model="entity.slug">
							</div> -->
							<div class="form-group">								
								<select class="form-control" v-model="entity.parent">		
									<option value="">上级分类</option>							
									<option v-for="item in categories" :value="item._id">{{item.name}}</option>
								</select>
							</div>
							<div class="checkbox">
								<label>
									<input type="checkbox" v-model="entity.is_nav"> 菜单显示
								</label>
							</div>		
						</div>
						<div class="box-footer clearfix">
							<button class="btn btn-primary" type="button" @click="storeData">提交</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>

	import {editAction, updateAction} from '../../vuex/actions/category';	

	export default {
		ready(){
			this.editAction();
		},		
		vuex: {
			actions: {
				editAction,
				updateAction			
			},
			getters: {
				categories: ({category}) => category.categories,					
				entity: ({category}) => category.entity					
			}
		},	
		methods: {
			storeData(){
				this.updateAction(this.entity);
			}
		}
	}
</script>