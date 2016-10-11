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
	import SimpleMDE from '../assets/js/plugins/simplemde/simplemde.min.js';	

	export default {
		replace: true,
		props:{
			text:{
				type: String,
				default: ''
			},	
			placeholder:{
				type: String,
				default: '内容'
			},	
			toolbar:{
				type: Array,
				default: ()=>{
					return [
					{
						name: "bold",
						action: SimpleMDE.toggleBold,
						className: "fa fa-bold",
						title: "Bold"						
					},
					{
						name: "italic",
						action: SimpleMDE.toggleItalic,
						className: "fa fa-italic",
						title: "Italic"
					},
					{
						name: "heading",
						action: SimpleMDE.toggleHeadingSmaller,
						className: "fa fa-header",
						title: "Heading"
					},
					'|',
					{
						name: "code",
						action: SimpleMDE.toggleCodeBlock,
						className: "fa fa-code",
						title: "Code"
					},
					{
						name: "quote",
						action: SimpleMDE.toggleBlockquote,
						className: "fa fa-quote-left",
						title: "Quote"						
					},
					'|',
					{
						name: "unordered-list",
						action: SimpleMDE.toggleUnorderedList,
						className: "fa fa-list-ul",
						title: "Generic List"						
					},
					{
						name: "ordered-list",
						action: SimpleMDE.toggleOrderedList,
						className: "fa fa-list-ol",
						title: "Numbered List"
					},
					'|',
					{
						name: "link",
						action: SimpleMDE.drawLink,
						className: "fa fa-link",
						title: "Create Link"
					},
					{
						name: "image",
						action: SimpleMDE.drawImage,
						className: "fa fa-picture-o",
						title: "Insert Image"
					},
					{
						name: "table",
						action: SimpleMDE.drawTable,
						className: "fa fa-table",
						title: "Insert Table"
					},
					{
						name: "horizontal-rule",
						action: SimpleMDE.drawHorizontalRule,
						className: "fa fa-minus",
						title: "Insert Horizontal Line"
					},
					'|',
					{
						name: "clean-block",
						action: SimpleMDE.cleanBlock,
						className: "fa fa-eraser fa-clean-block",
						title: "Clean block"
					},
					{
						name: "undo",
						action: SimpleMDE.undo,
						className: "fa fa-undo no-disable",
						title: "Undo"
					},
					{
						name: "redo",
						action: SimpleMDE.redo,
						className: "fa fa-repeat no-disable",
						title: "Redo"
					},
					'|',
					{
						name: "preview",
						action: SimpleMDE.togglePreview,
						className: "fa fa-eye no-disable",
						title: "Toggle Preview"
					},
					{
						name: "side-by-side",
						action: SimpleMDE.toggleSideBySide,
						className: "fa fa-columns no-disable no-mobile",
						title: "Toggle Side by Side"
					},
					{
						name: "fullscreen",
						action: SimpleMDE.toggleFullScreen,
						className: "fa fa-arrows-alt no-disable no-mobile",
						title: "Toggle Fullscreen"
					}
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
				toolbar: this.toolbar,
				autoDownloadFontAwesome: false,
				placeholder: this.placeholder
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