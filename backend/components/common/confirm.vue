<template>
	<div>
		<div class="modal-backdrop fade in"></div>
		<div class="modal confirmation-modal fade in" style="display:block;">	
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-body">{{msg}}</div>
					<div class="modal-footer">
						<button class="confirm btn btn-primary" type="button" @click="ok">确定</button>
						<button class="cancel btn btn-default" type="button" @click="cancel">取消</button></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['ok', 'cancel','msg']
	}
</script>