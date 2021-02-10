<template>
    <div class="modal-confirm"
		 :class="value ? 'modal-active' : ''"
	>
		<div class="modal-wrapper">
			<div class="modal-container modal">
				<div class="modal__head">
					<slot name="head"></slot>
				</div>
				<div class="modal__body">
					<slot name="body"></slot>
				</div>
				<div class="modal__actions">
					<slot name="actions"></slot>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    export default {
        name: "modal-confirm",
		props: {
        	value: {
				// для v-model
				// отображать или нет
        		type: Boolean,
				required: true,
				default() {
        			return false;
				}
			}
		}
    }
</script>

<style scoped lang="scss">
	@import '@/assets/variables.scss';

	/*родительский тег компонента*/
	.modal-confirm {
		@include position(fixed);
		z-index: 9998;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: none;
		transition: opacity 0.3s ease;

		/*модификатор активного окна*/
		&.modal-active{
			display: table;
		}
		/*обертка модального окна*/
		.modal-wrapper {
			display: table-cell;
			vertical-align: middle;
			/*контейнер для контента окна*/
			.modal-container {
				min-width: 300px;
				background-color: #fff;
				transition: all 0.3s ease;
			}
		}
	}

	/*тег для контента модального окна*/
	.modal{
		width: 500px;
		margin: auto;
		border-radius: 4px;
		padding: 16px;
		border: none;
		box-sizing: border-box;
		@include main_font;
		.modal__head,
		.modal__body{
			padding: 0 0 8px 0;
		}
		.modal__head{
			font-size: 18px;
		}
		/*кнопки управления*/
		.modal__actions{
			display: flex;
			align-items: center;
			justify-content: space-evenly;
		}
	}
</style>
