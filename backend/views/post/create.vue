<template>
	<div>		
		<section class="content">
			<div class="row">
				<div class="col-md-12">
					<div class="box">
						<div class="box-header">
							<h3 class="box-title">文章新增</h3>
						</div>
						<div class="box-body row">
							<div class="col-md-10">
								<div class="form-group">									
									<input type="text" placeholder="标题" class="form-control" v-model="entity.title">
								</div>	
								<!-- <div class="form-group">									
									<textarea class="form-control"  placeholder="摘要" v-model="entity.summary"></textarea>	
								</div>	 -->
								<markdown-editor :content-raw.sync="entity.content_raw"></markdown-editor>																
							</div>
							<div class="col-md-2">													
								<div class="form-group">									
									<select class="form-control" v-model="entity.category">		
										<option value="">选择分类</option>							
										<option v-for="item in categories" :value="item._id">{{item.name}}</option>
									</select>
								</div>
								<div class="form-group">									
									<select class="form-control" multiple v-model="entity.tags">		
										<option value="">选择标签</option>							
										<option v-for="item in tags" :value="item._id">{{item.name}}</option>
									</select>
								</div>
								<div class="form-group">									
									<input type="text" placeholder="作者" class="form-control" v-model="entity.author">
								</div>
								<div class="checkbox">
									<label>
										<input type="checkbox" v-model="entity.is_hidden"> 是否显示
									</label>
								</div>
								<!-- <div class="form-group">									
									<input type="text" placeholder="Slug" class="form-control" v-model="entity.slug">
								</div>	
								<div class="checkbox">
									<label>
										<input type="checkbox" v-model="entity.is_markdown"> 是否为markdown
									</label>
								</div> -->
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

	import {createAction, storeAction} from '../../vuex/actions/post';	
	import MarkdownEditor from '../../components/markdown-editor';

	export default {
		ready(){
			this.createAction();			
		},		
		vuex: {
			actions: {
				createAction,
				storeAction							
			},
			getters: {					
				entity: ({post}) => post.entity,			
				categories: ({post}) => post.categories,			
				tags: ({post}) => post.tags,			
			}
		},	
		components: {
			MarkdownEditor
		},	
		methods: {
			storeData(){				
				this.storeAction(this.entity);
			}
		}
	}
</script>