<template>
	<div>	
		<section class="content">
			<div class="row">
				<div class="col-md-12">
					<div class="box">
						<div class="box-header">
							<h3 class="box-title">文章修改</h3>
							<div class="pull-right box-tools">
								<a class="btn btn-default" v-link="{name:'post_index'}">返回</a>
							</div>
						</div>
						<div class="box-body row">
							<div class="col-md-9">
								<div class="form-group">									
									<input type="text" placeholder="标题" class="form-control" v-model="entity.title">
								</div>									
								<div class="form-group">									
									<textarea class="form-control"  placeholder="摘要" v-model="entity.summary"></textarea>	
								</div>								
								<Simplemde :text="entity.content_raw" :action="editorAction"></Simplemde>
							</div>
							<div class="col-md-3">	
								<div class="form-group">									
									<input type="text" placeholder="Slug" class="form-control" v-model="entity.slug">
								</div>													
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
								<div class="form-group">									
									<upload :action="uploadCoverAction" :text="entity.cover_image?'重新上传封面':'上传封面'"></upload>
									<span v-if="entity.cover_image">
										<img :src="entity.cover_image" width="80" title="点击删除">
										<span @click="deleteCoverAction"><i class="fa fa-remove"></i>删除图片</span>
									</span>
								</div>
								<div class="form-group">									
									<input type="text" placeholder="项目地址" class="form-control" v-model="entity.project_link">
								</div>	
								<div class="form-group">									
									<upload :action="uploadAttachmentAction" :text="entity.attachment?'重新上传附件':'上传附件'"></upload>
									<span title="点击删除" v-if="entity.attachment" @click="deleteAttachmentAction">
										{{entity.attachment | sub_str 20}}
										<i class="fa fa-remove"></i>删除附件
									</span>								
								</div>
								<div class="checkbox">
									<label>
										<input type="checkbox" v-model="entity.is_hidden"> 是否显示
									</label>
								</div>
								<!-- 
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

	import {
		editAction, 
		updateAction, 
		uploadCoverAction, 
		deleteCoverAction, 
		editorAction,
		uploadAttachmentAction,
		deleteAttachmentAction
	} from '../../vuex/actions/post';
	import Simplemde from '../../components/simplemde';
	import Upload from '../../components/upload';

	export default {
		ready(){
			this.editAction();
		},		
		vuex: {
			actions: {
				editAction,
				updateAction,
				uploadCoverAction,
				deleteCoverAction,
				editorAction,
				uploadAttachmentAction,
				deleteAttachmentAction					
			},
			getters: {							
				entity: ({post}) => post.entity,			
				categories: ({post}) => post.categories,			
				tags: ({post}) => post.tags,					
			}
		},	
		components: {
			Simplemde,
			Upload	
		},
		methods: {
			storeData(){
				this.updateAction(this.entity);
			}
		}
	}
</script>