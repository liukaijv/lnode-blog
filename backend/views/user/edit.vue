<template>
	<div>	
		<section class="content">
			<div class="row">
				<div class="col-md-12">
					<div class="box">
						<div class="box-header">
							<h3 class="box-title">个人资料</h3>
							<div class="pull-right box-tools">
								
							</div>
						</div>
						<div class="box-body">							
							<div class="form-group">								
								<input type="text" placeholder="用户名" class="form-control" disabled value="{{user.name}}">
							</div>
							<div class="form-group">								
								<input type="text" placeholder="邮箱" class="form-control" v-model="user.email">
							</div>
							<div class="form-group">								
								<input type="text" placeholder="昵称" class="form-control" v-model="user.nickname">
							</div>
							<div class="form-group">								
								<input type="password" placeholder="原密码" class="form-control" v-model="user.password">
							</div>	
							<div class="form-group">								
								<input type="password" placeholder="新密码" class="form-control" v-model="user.new_password">
							</div>	
							<div class="form-group">								
								<input type="password" placeholder="新密码确认" class="form-control" v-model="user.repeat_password">
							</div>						
						</div>
						<div class="box-footer clearfix">
							<button class="btn btn-primary" type="button" @click="updateData">提交</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>

	import {editAction, updateAction} from '../../vuex/actions/user';	

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
				user: ({user}) => user.entity					
			}
		},	
		methods: {
			updateData(){
				this.updateAction(this.user);
			}
		}
	}
</script>