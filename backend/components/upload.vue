<style>
	.vue-upload{
		display: inline-block;
		vertical-align: middle;
	}
</style>
<template>
	<div class="vue-upload">
		<label class="upload">
			<span class="upload-btn btn btn-primary">{{text}}</span>
			<input type="file" :accept="accept" :multiple="multiple" @change="inputChange($event)">
		</label>
		<button type="button" class="btn btn-primary" @click="uploadFile" v-if="!changeUpload">上传文件</button>
	</div>
</template>

<script>
	export default {
		props: {
			text:{
				type:String,
				default:'选择上传'
			},
			accept:{
				type: String,
				default: 'image/*'
			},
			multiple:{
				type: Boolean,
				default: false
			},
			action:{
				requried:true,
				type: Function,
				default: (files)=>{console.log('empty upload action')}
			},
			changeUpload: {
                type: Boolean,
                default: true
            },
		},
		beforeCompile: function () {
			this.files = null;         
		},
		methods:{
			inputChange(e){				
				this.files = e.target.files;
				if(this.changeUpload){
					this.action(this.files);
				}	
			},
			uploadFile(){
				this.action(this.files);
			}
		}
	}
</script>