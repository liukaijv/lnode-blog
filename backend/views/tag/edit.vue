<template>
	<div>	
		<section class="content">
			<div class="row">
				<div class="col-md-12">
					<div class="box">
						<div class="box-header">
							<h3 class="box-title">标签修改</h3>
						</div>
						<div class="box-body">
							<div class="form-group">								
								<input type="text" placeholder="标签名称" class="form-control" v-model="entity.name">
							</div>
							<!-- <div class="form-group">								
								<input type="text" placeholder="Slug" class="form-control" v-model="entity.slug">
							</div>		 -->			
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

	import {editAction, updateAction} from '../../vuex/actions/tag';	

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
				entity: ({tag}) => tag.entity					
			}
		},	
		methods: {
			storeData(){
				this.updateAction(this.entity);
			}
		}
	}
</script>