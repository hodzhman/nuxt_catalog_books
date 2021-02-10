<template>
	<div class="catalog">
		<div class="catalog__tools">
			<div class="catalog__count" v-show="catalog_count.length > 0">
				{{catalog_count}}
			</div>
			<div class="catalog__pagination">

			</div>
			<div class="catalog__sort">
				<select class="catalot__sort-select sort-select" v-if="false">
					<option v-for="item in sort_value"
							:value="item.value"
							class="sort-select__option"
					>{{item.text}}</option>
				</select>

				<div class="catalog__sort-select select">
					<div class="select__active-elem"
						 :class="[{'select__active-elem_opened': select_view}]"
						 @click="select_view = !select_view"
					>
						{{sort_selected.text}} <span class="material-icons">keyboard_arrow_up</span>
					</div>
					<div class="select__values"
						 v-show="select_view"
					>
						<div
							@click="select_choose(item)"
							class="select__option"
							v-for="(item, i) in sort_value"
							:key="i"
							:class="(sort_selected.value === item.value ? 'select__option_active' : '')"
						>{{item.text}}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="catalog__books-container">
			<div class="catalog__books">
				<book
					v-for="item in books"
					:key="item.id"
					:book-info="item"
				/>
			</div>
			<div class="catalog__footer">
				<button
					class="catalog__btn-add-book"
					@click="catalog_add_book"
				>Показать ещё</button>
			</div>
		</div>
	</div>
</template>

<script>
	import Book from '@/components/book.vue';
	import * as axios from 'axios';
    export default {
        name: "catalog",
		components: {
			Book
		},
		async asyncData({ $http, params }){
			let books = [],
				catalog_count = '',
				sort_value = [{value: 'default', text: 'по умолчанию'}],
				url = 'https://www.respublica.ru/api/v1/listing/knigi',
				sort_order = params.sort;
			if(sort_order){
				url += '?order=' + sort_order;
			}
			console.log(url);

			await axios
				.get(url)
				.then((response) => {
					// console.log(response)
					if (response) {
						if(response.data.hasOwnProperty('items') && response.data.items.hasOwnProperty('data') ){
							books = response.data.items.data;
						}
						if(response.data.hasOwnProperty('pagination')){
							catalog_count = String(response.data.pagination.count) + ' товаров';

						}
						if(response.data.order.hasOwnProperty('available')){
							let items = response.data.order['available'];
							for(let key in items){
								let text = items[key];
								if(sort_value.find(x => x.value === key) === undefined){
									sort_value.push({value: key, text});
								}
							}
						}
					}
				})
				.catch(error => console.error(error))
			console.log( books, catalog_count, sort_value );
			return { books, catalog_count, sort_value }
		},
		data: () => ({
			books: [],
			catalog_count: '',
			select_view: false,
			sort_value: [],
			sort_selected: {value: 'default', text: 'По умолчанию'},
			btn_disabled: false,
		}),
		head: () => ({
			title: 'R° Каталог'
		}),
		mounted(){
        	this.$router.push('/');
		},
		methods: {
			select_choose(item){
				console.log('select_choose ', item);
				this.sort_selected = JSON.parse(JSON.stringify(item));
				this.sort_selected.text = this.sort_selected.text[0].toUpperCase() + this.sort_selected.text.slice(1);
				localStorage.setItem('order_sort', item.value);
				// this.select_view = false;
			},
			async catalog_add_book(){
				if(this.btn_disabled)
					return;
				this.btn_disabled = true;
				let url = 'https://www.respublica.ru/api/v1/listing/knigi';
				url += '?page=2';
				url += '?order=' + this.sort_selected.value;
				await axios({
					methods: 'get',
					url: url
				})
					.then(response => {
						console.log(response);
						if(response.data.hasOwnProperty('items') && response.data.items.hasOwnProperty('data')){
							this.books = this.books.concat(response.data.items.data);
						}
					})
					.catch(error => console.error(error));
				this.btn_disabled = false;
			}
		}
    }
</script>

<style scoped lang="scss">

	@import '@/assets/variables.scss';

	.catalog{
		margin-bottom: 32px;
		.catalog__tools{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.catalog__count{
				@include main_font;
				color: $gray;
			}
		}
		.catalog__books {
			display: flex;
			flex-flow: wrap;
		}
		.catalog__footer{
			width: 100%;
			text-align: center;
			.catalog__btn-add-book{
				@include main_font;
				text-transform: lowercase;
				color: $gray;
				margin: 0;
				height: 32px;
				width: 150px;
				background: transparent;
				border: none;
				cursor: pointer;
				padding: 4px;
				&:hover,
				&:focus,
				&:active{
					outline: none;
					border: none;
				}
			}
		}
	}

	.sort-select{
		@include main_font;
		border: none;
		background: transparent;
		.sort-select__option{
			border: none;
			background: transparent;
		}
	}

	.select{
		@include main_font;
		position: relative;
		width: 200px;
		.select__active-elem{
			cursor: pointer;
			display: flex;
			height: 28px;
			align-items: center;
			padding: 4px;
			&.select__active-elem_opened .material-icons{
				transform: scaleY(-1);
			}
		}
		.select__values{
			border: 1px solid $gray;
			border-radius: 4px;
			cursor: pointer;
			position: absolute;
			top: 37px;
			z-index: 1;
			background: $main-color;
			width: 100%;
			max-height: 185px;
			overflow-y: auto;
			.select__option{
				padding: 4px;
				margin-bottom: 2px;
			}
			.select__option_active{
				color: $blue;
			}
		}
	}
</style>
