<template>
	<div class="modal-component modal-component_active">
		<div class="modal-component__overlay"></div>
		<div class="modal-component__container modal modal_active"

		>
			<div class="modal__content">

			</div>
		</div>
	</div>
</template>

<script>
    export default {
        name: "modal",
		props: {
			value: {
				type: Boolean,
				required: true,
				default(){
					return false;
				}
			},
			test: {
				type: String,
				required: false
			}
		},
		// props: ['value'],
		data: ()=>({
			// active: !!this.value
		}),
    }
</script>

<style scoped lang="scss">
	@import '@/assets/variables.scss';

	.modal-component{
		display: none;
		.modal-component__overlay{
			background-color: #212121;
			opacity: 0.5;
		}
		.modal-component__container{

		}
		.modal-component_active{
			display: flex;
		}
	}

	.modal-overlay{
		background-color: #212121;
		opacity: 0.5;
	}

	.modal-container{
		display: none;
		align-items: center;
		height: 100%;
		justify-content: center;
		left: 0;
		pointer-events: none;
		@include position(fixed);
		top: 0;
		transition: 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
		width: 100%;
		z-index: 99999;
		outline: none;
		&.modal-container_active{
			display: flex;
		}
		.modal{
			min-width: 400px;
			min-height: 200px;
			background: $main-color;
			border-radius: 8px;
		}
	}
</style>
