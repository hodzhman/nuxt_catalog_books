<template>
	<div class="pagination"
		 v-if="pages_info.current"
	>
		<button
			class="pagination__btn"
			v-show="pages_info.current > 1"
			@click="select_page(1)"
		>1</button>

		<button
			class="pagination__btn pagination__btn-dots"
			v-show="pagination_dots_prev"
		>&hellip;</button>
		<button
			class="pagination__btn"
			@click="select_page(pages_info.previous)"
			v-show="pagination_btn_prev"
		>{{pages_info.previous}}</button>

		<button
			class="pagination__btn pagination__btn_active"
		>{{pages_info.current}}</button>

		<button
			class="pagination__btn"
			@click="select_page(pages_info.next)"
			v-show="pagination_btn_next"
		>{{pages_info.next}}</button>
		<button
			class="pagination__btn pagination__btn-dots"
			v-show="pagination_dots_next"
		>&hellip;</button>

		<button
			class="pagination__btn"
			@click="select_page(pages_info.pages)"
			v-show="pagination_btn_last"
		>{{pages_info.pages}}</button>
	</div>
</template>

<script>
    export default {
        name: "pagination",
		//объект с данными с сервера содержит информацию о страницах
		// TODO: добавить проверки?
		props: ['pages_info'],
		methods: {
			select_page(num_page){
				// при клике на кнопку страницы
				if(num_page){
					this.$emit('change_page', num_page)
				}
			}
		},
		computed: {
			pagination_dots_prev(){
				//свойство для отображения "..."
				if(!this.pages_info.previous)
					return false;
				return (this.pages_info.previous > 2);
			},
			pagination_dots_next(){
				//свойство для отображения "..."
				if(!this.pages_info.next)
					return false;
				return (this.pages_info.current < (this.pages_info.pages - 2));
			},
			pagination_btn_prev(){
				//свойство для отображения кнопки предыдущей страницы
				if(!this.pages_info.previous)
					return false;
				return (this.pages_info.previous && this.pages_info.current > 2)
			},
			pagination_btn_next(){
				//свойство для отображения кнопки следующей страницы
				if(!this.pages_info.next)
					return false;
				return (this.pages_info.next && this.pages_info.next < this.pages_info.pages);
			},
			pagination_btn_last(){
				//свойство для отображения кнопки последней страницы
				return (this.pages_info.current < this.pages_info.pages);
			}
		}
    }
</script>

<style scoped lang="scss">
	@import '@/assets/variables.scss';

	/*родительский тег компонента*/
	.pagination{
		@include main_font;
		padding: 0 4px;
		min-width: 300px;
		text-align: center;

		/*кнопки страниц*/
		.pagination__btn{
			&:hover,
			&:focus,
			&:active{
				outline: none;
				border: none;
			}
			@include main_font;
			font-size: 14px;
			margin: 0 8px 0 0;
			padding: 0;
			border: none;
			min-height: 28px;
			min-width: 28px;
			background: transparent;
			&:last-child{
				margin: 0;
			}
			/*для кнопок с номерами страниц*/
			&:not(.pagination__btn-dots){
				color: $main-color;
				background: $blue-dark;
				cursor: pointer;
			}
			&:not(.pagination__btn-dots):hover,
			&.pagination__btn_active{
				background: $blue-light;
			}
		}
	}
</style>
