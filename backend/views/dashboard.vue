<template>	
	<section class="content">
		<div class="row">
			<div class="col-md-4 col-sm-6 col-xs-12" v-link="{name:'post_index'}">
				<div class="info-box">
					<span class="info-box-icon bg-aqua"><i class="fa fa-file"></i></span>
					<div class="info-box-content">
						<span class="info-box-text">文章</span>
						<span class="info-box-number">{{post_count}}</span>
					</div>						
				</div>					
			</div>

			<div class="col-md-4 col-sm-6 col-xs-12" v-link="{name:'category_index'}">
				<div class="info-box">
					<span class="info-box-icon bg-red"><i class="fa fa-list"></i></span>
					<div class="info-box-content">
						<span class="info-box-text">分类</span>
						<span class="info-box-number">{{category_count}}</span>
					</div>
				</div>					
			</div>

			<div class="clearfix visible-sm-block"></div>

			<div class="col-md-4 col-sm-6 col-xs-12" v-link="{name:'tag_index'}">
				<div class="info-box">
					<span class="info-box-icon bg-green"><i class="fa fa-tag"></i></span>
					<div class="info-box-content">
						<span class="info-box-text">标签</span>
						<span class="info-box-number">{{tag_count}}</span>
					</div>
				</div>
			</div>

			<!-- <div class="col-md-3 col-sm-6 col-xs-12">
				<div class="info-box">
					<span class="info-box-icon bg-yellow"><i class="fa fa-comment"></i></span>
					<div class="info-box-content">
						<span class="info-box-text">评论</span>
						<span class="info-box-number">2000</span>
					</div>						
				</div>
			</div> -->

		</div>
	
	</div>
</section>

</template>

<script>
	import {dashboardAction} from '../vuex/actions/dashboard';	

	export default {
		ready(){
			this.dashboardAction();			
		},		
		vuex: {
			actions: {
				dashboardAction					
			},
			getters: {					
				post_count: ({dashboard}) => dashboard.post_count,			
				tag_count: ({dashboard}) => dashboard.tag_count,			
				category_count: ({dashboard}) => dashboard.category_count,			
			}
		}
	}
</script>