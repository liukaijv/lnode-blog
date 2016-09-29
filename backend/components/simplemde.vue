<style>
	.CodeMirror-fullscreen,
	.editor-toolbar.fullscreen{
		z-index: 9999!important;
	}
	.CodeMirror, .CodeMirror-scroll {
		min-height: 400px!important;
	}

</style>

<template>		
	<textarea></textarea>
</template>

<script>

	import '../assets/js/plugins/simplemde/simplemde.min.css';
	import SimpleMDE from 'simplemde';

	export default {
		replace: true,
		props:{
			text:{
				type: String,
				default: ''
			},		
			toolbar:{
				type: Array,
				default: ()=>{
					return [
					'bold',
					'italic',
					'strikethrough',
					'heading',
					'|',
					'code',
					'quote',
					'|',
					'unordered-list',
					'ordered-list',
					'|',
					'link',
					'image',
					'table',
					'horizontal-rule',
					'|',
					'clean-block',
					'undo',
					'redo',
					'|',
					'preview',
					'side-by-side',
					'fullscreen',
					'|',
					'guide'				
					];
				}
			},
			action: {
				type: Function,
				default: (text)=>{console.log('no editor action')}
			}
		},
		beforeCompile: function () {
			this.isChanging = false;         
		},
		ready(){			
			this.simplemde = new SimpleMDE({
				element: this.$el,
				toolbar: this.toolbar
			});			
			this.simplemde.value(this.text);
			this.simplemde.codemirror.on("change", function(){
				if (!this.isChanging) {
					this.isChanging = true;
					let text = this.simplemde.value();
					// this.text = text;
					this.action(text);
					this.$nextTick(function () {
						this.isChanging = false;
					});				
				}
			}.bind(this));
		},
		watch:{			
			text: function (val, oldVal) {
                if (!this.isChanging) {
                    this.isChanging = true;
                    var text = (val === null ? "" : val);
                    this.simplemde.value(text);                   
                    // this.simplemde.codemirror.signal("change");
                    this.isChanging = false;
                }
            }
		}
	}

</script>