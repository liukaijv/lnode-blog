<style>
	#markdown-preview{
		padding: 10px 15px;
		min-height: 400px;
		border: 1px solid #d2d6de;
	}
</style>
<template>
	<div class="markdown-editor">
		<div class="clearfix">
			<div class="btn-toolbar pull-left" v-show="!showPreview">
				<div class="btn-group">	
					<button class="btn" title="标题一" @click="h(1)"><strong>H1</strong></button>
					<button class="btn" title="标题二" @click="h(2)"><strong>H2</strong></button>
					<button class="btn" title="标题三" @click="h(3)"><strong>H3</strong></button>
					<button class="btn" title="标题四" @click="h(4)"><strong>H4</strong></button>
					<button class="btn" title="标题五" @click="h(5)"><strong>H5</strong></button>
					<button class="btn" title="标题六" @click="h(6)"><strong>H6</strong></button>
				</div>
				<div class="btn-group">
					<button class="btn" title="加粗" @click="wrap('**')">
						<i class="fa fa-bold"></i>
					</button>
					<button class="me-italic btn" title="斜体" @click="wrap('*')">
						<i class="fa fa-italic"></i>
					</button>
				</div>
				<div class="btn-group">
					<button class="btn" title="链接" @click="link">
						<i class="fa fa-link"></i>
					</button>
				</div>
				<div class="btn-group">
					<button class="btn" title="引用" @click="prependToLeadingLine('> ')">
						<i class="fa fa-quote-left"></i>
					</button>
					<button class="btn" title="代码" @click="wrap('`')">
						<i class="fa fa-code"></i>
					</button>
				</div>				
				<div class="btn-group">
					<button class="btn" title="增加缩进" @click="prependToEveryLine('    ')">
						<i class="fa fa-indent"></i>
					</button>
					<button class="btn" title="减少缩进" @click="outdent">
						<i class="fa fa-outdent"></i>
					</button>
				</div>
				<div class="btn-group">
					<button class="btn" title="分割线" @click="hr">
						<i class="fa fa-arrows-h"></i>
					</button>
				</div>				
			</div>			
			<h4 class="pull-left" v-if="showPreview">
				文章预览
			</h4>			
			<div class="pull-right">
				<button class="btn" title="upload">												
					<span><i class="fa fa-upload"></i> 本地文档</span>						
				</button>	
				<button class="btn" title="preview" @click="preview">
					<span v-if="showPreview"><i class="fa fa-pencil"></i> 编辑</span>						
					<span v-else><i class="fa fa-eye"></i> 预览</span>						
				</button>
			</div>
		</div>
		<div class="form-group">
			<div id="markdown-preview" v-if="showPreview">{{{content?content:'无可预览内容'}}}</div>									
			<textarea class="form-control" id="markdown-textarea" style="height:400px;" placeholder="文章内容" v-model="contentRaw" v-else></textarea>						
		</div>	
	</div>
</template>

<script>

	import '../assets/js/jquery.caret';
	import showdown from  'showdown';

	export default {
		props:{
			contentRaw: {				
				type: String,
				default: ''
			},
			content: {				
				type: String,
				default: ''
			},
			showPreview: {
				type: Boolean,
				default: false
			}
		},	
		methods: {
			h(q){
				$('#markdown-textarea').caret().prependToLeadingLine((new Array(q+1)).join('#')+' ');
			},
			wrap(word){
				$('#markdown-textarea').caret().wrap(word);
			},
			link(){
				let caret = $('#markdown-textarea').caret();
				caret.wrap('['+caret.text+'](', ')');
			},
			prependToLeadingLine(word){
				$('#markdown-textarea').caret().prependToLeadingLine(word);
			},
			prependToEveryLine(word){
				$('#markdown-textarea').caret().prependToEveryLine(word);
			},
			outdent(){
				$('#markdown-textarea').caret().replaceInSelection(/[ ]{4}(?![ ]{4})/g, "");
			},
			hr(){
				$('#markdown-textarea').caret().replace('*****', true);
			},
			preview(){					
				let converter = new showdown.Converter();				
				this.content = converter.makeHtml(this.contentRaw);
				this.showPreview = !this.showPreview;
			}
		}
	}
</script>