<template>
  <div v-show="books && books.length > 0" class="catalog">
    <div class="catalog__tools">
      <div v-show="catalog_count.length > 0" class="catalog__count">
        {{ catalog_count }}
      </div>
      <div class="catalog__pagination">
        <pagination
          :pages_info="pagination"
          @change_page="go_to_pages"
        />
      </div>
      <div class="catalog__sort">
        <div class="catalog__sort-select select">
          <div
            class="select__active-elem"
            :class="[{'select__active-elem_opened': select_view}]"
            @click="select_view = !select_view"
          >
            {{ sort_selected.text | select_filter_text }} <span class="material-icons">keyboard_arrow_up</span>
          </div>
          <div
            v-show="select_view"
            class="select__values"
          >
            <div
              v-for="(item, i) in sort_value"
              :key="i"
              class="select__option"
              :class="(sort_selected.value === item.value ? 'select__option_active' : '')"
              @click="select_choose(item)"
            >
              {{ item.text }}
            </div>
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
          v-show="pagination.next"
          class="catalog__btn-add-book"
          @click="catalog_add_book"
        >
          Показать ещё
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Book from '@/components/book.vue'
import * as axios from 'axios'
import Pagination from '../components/pagination'
export default {
	head: () => ({
		// title: 'R° Главная страница'
		title: 'R° Каталог'
	}),
	components: {
		Pagination,
		Book
	},
	async asyncData ({ $http }) {
		let books = [],
			catalog_count = '',
			sort_value = [{ value: 'default', text: 'по умолчанию' }];
		await axios
			.get('https://www.respublica.ru/api/v1/listing/knigi')
			.then((response) => {
				if (response) {
					// if(response.data.hasOwnProperty('items') && response.data.items.hasOwnProperty('data') ){
					// 	books = response.data.items.data;
					// }
					// if(response.data.hasOwnProperty('pagination')){
					// 	catalog_count = String(response.data.pagination.count) + ' товаров';
					// }
					if (response.data.order.hasOwnProperty('available')) {
						let items = response.data.order.available
						for (let key in items) {
							let text = items[key]
							if (sort_value.find(x => x.value === key) === undefined) {
								sort_value.push({ value: key, text })
							}
						}
					}
				}
			})
			.catch(error => console.error(error))
		return { books, catalog_count, sort_value }
	},
	data: () => ({
		books: [], //массив с товаром/книгами
		catalog_count: '', //колво товаров
		select_view: false, //отображение списка сортировки
		sort_value: [], //массив с элементами списка сортирвоки
		sort_selected: { value: 'default', text: 'По умолчанию' }, //выбранный элемент сортировки
		btn_disabled: false, //флаг для блокировки отправки лишних запросов
		pagination: {} //данные для пагинации
	}),
	methods: {
		select_choose (item) {
			//функция при выборе нового способа сортировки
			console.log('select_choose ', item)
			this.sort_selected = JSON.parse(JSON.stringify(item))
			this.select_view = false
			localStorage.setItem('order_sort', item.value)
			let url = 'https://www.respublica.ru/api/v1/listing/knigi'
			url += '?page=' + this.pagination.current
			url += '&order=' + this.sort_selected.value
			this.get_books(true, url)
		},
		async get_books (clear = false, url = 'https://www.respublica.ru/api/v1/listing/knigi', flag_first = false) {
			//функция для запроса книг
			//аргументы:
			//clear - очищать массив книг или доавблять к уже имеющимся данным
			//url - путь для запроса
			//flag_first - запрос выполняется первый раз?

			if (flag_first) {
				url += '?page=1'
				let sort = localStorage.getItem('order_sort')
				if (sort) {
					url += '&order=' + sort
				}
			}
			console.log(url)
			this.$nextTick(() => {
				this.$nuxt.$loading.start()
			})
			await axios(url)
				.then((response) => {
					console.log(response)
					if (response.data.hasOwnProperty('items') && response.data.items.hasOwnProperty('data')) {
						if (clear) {
							this.books = response.data.items.data
						} else {
							this.books = this.books.concat(response.data.items.data)
						}
					}
					if (response.data.hasOwnProperty('pagination')) {
						this.catalog_count = String(response.data.pagination.count) + ' товаров'
						this.pagination = response.data.pagination
					}
					if (flag_first) {
						if (response.data.order.hasOwnProperty('available')) {
							let items = response.data.order.available
							for (let key in items) {
								let text = items[key]
								if (this.sort_value.find(x => x.value === key) === undefined) {
									this.sort_value.push({ value: key, text })
								}
							}
						}
					}
					this.$nextTick(() => {
						this.$nuxt.$loading.finish()
					})
				})
				.catch(error => console.error(error))
			this.$nextTick(() => {
				this.$nuxt.$loading.finish()
			})
		},
		async catalog_add_book () {
			//обработчик клика на кнопку "показать ещё"
			if (this.btn_disabled) { return }
			this.btn_disabled = true
			let url = 'https://www.respublica.ru/api/v1/listing/knigi'
			url += '?page=' + this.pagination.next
			url += '&order=' + this.sort_selected.value
			await this.get_books(false, url)
			this.btn_disabled = false
		},
		go_to_pages (page_num) {
			//функция сработает при смене страницы
			//см компонент Pagination
			let url = 'https://www.respublica.ru/api/v1/listing/knigi'
			url += '?page=' + page_num
			url += '&order=' + this.sort_selected.value
			this.get_books(true, url)
		}
	},
	filters: {
		select_filter_text (value) {
			//форматирование для выбранного способа сортировки
			if (!value) { return '' }
			value = value.toString()
			return value.charAt(0).toUpperCase() + value.slice(1)
		}
	},
	mounted () {
		let sort = localStorage.getItem('order_sort')
		if (sort === null || sort === undefined) {
			sort = 'default'
			localStorage.setItem('order_sort', 'default')
		}
		this.sort_selected = this.sort_value.find(x => x.value === sort)
		// this.$router.redirect({
		// 	path: '/catalog',
		// 	params: { sort }
		// });
		this.get_books(true, 'https://www.respublica.ru/api/v1/listing/knigi', true)
	}
}
</script>

<style scoped lang="scss">
	@import '@/assets/variables.scss';

	.catalog {
		margin-bottom: 32px;

		.catalog__count,
		.catalog__pagination,
		.catalog__sort {
			min-width: 200px;
		}

		.catalog__tools {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.catalog__count {
				@include main_font;

				color: $gray;
			}
		}

		.catalog__books {
			display: flex;
			flex-flow: wrap;
		}

		.catalog__footer {
			width: 100%;
			text-align: center;

			.catalog__btn-add-book {
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
				&:active {
					outline: none;
					border: none;
				}
			}
		}
	}

	.sort-select {
		@include main_font;

		border: none;
		background: transparent;

		.sort-select__option {
			border: none;
			background: transparent;
		}
	}

	.select {
		@include main_font;

		position: relative;
		width: 200px;

		.select__active-elem {
			cursor: pointer;
			display: flex;
			height: 28px;
			align-items: center;
			padding: 4px;

			&.select__active-elem_opened .material-icons {
				transform: scaleY(-1);
			}
		}

		.select__values {
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

			.select__option {
				padding: 4px;
				margin-bottom: 2px;
			}

			.select__option_active {
				color: $blue;
			}
		}
	}
</style>
