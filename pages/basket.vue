<template>
  <div class="basket">
    <template v-if="all_books.length === 0">
      <div class="basket-empty">
        <div
          class="basket-empty__title"
        >
          Корзина пуста
        </div>
        <nuxt-link
          to="/"
          tag="button"
          class="basket__btn basket-empty__btn"
        >
          В каталог
        </nuxt-link>
      </div>
    </template>
    <template v-else>
      <div
        v-for="book in all_books"
        :key="book.id"
        class="basket-elem"
      >
        <div class="basket-elem__image">
          <img
            class="basket-elem__img"
            :src="book.image"
            :alt="book.title"
          >
        </div>
        <div class="basket-elem__info">
          <div class="basket-elem__title">
            {{ book.title }}
          </div>
          <div class="basket-elem__author">
            {{ book.author }}
          </div>
        </div>
        <div class="basket-elem__tools">
          <div class="basket-elem__tools-control">
            <button
              class="btn-control"
              @click="book_dec(book.id)"
            >
              <span class="material-icons">remove</span>
            </button>
            <div class="basket-elem__count">
              {{ book.count }}
            </div>
            <button
              class="btn-control"
              @click="book_inc(book.id)"
            >
              <span class="material-icons">add</span>
            </button>
          </div>
          <div class="basket-elem__price">
            {{ book.price }} <span>&#8381;</span>
          </div>
          <div class="basket-elem__remove">
            <button
              class="btn-control"
              @click="modal_remove_open(book.id)"
            >
              <span class="material-icons">clear</span>
            </button>
          </div>
        </div>
      </div>
      <div class="basket-footer">
        <div class="basket-footer__clean-basket">
          <button
            class="basket__btn btn-clean"
            @click="modal_clearbasket_view = true"
          >
            Очистить корзину
          </button>
        </div>
        <div class="basket-footer__sum-total">
          Общая стоимость: <span class="basket-footer__sum-value">{{ sum_total }} &#8381;</span>
        </div>
      </div>

      <modal-confirm
        v-model="modal_remove_view"
        class="modal-remove"
      >
        <template #head>
          <span>Вы действительно хотите удалить товар из корзины?</span>
        </template>
        <template #body>
          <div class="basket-elem">
            <div class="basket-elem__image">
              <img
                class="basket-elem__img"
                :src="modal_remove_item.image"
                :alt="modal_remove_item.title"
              >
            </div>
            <div class="basket-elem__info">
              <div class="basket-elem__title modal-remove__title">
                {{ modal_remove_item.title }}
              </div>
              <div class="basket-elem__author modal-remove__author">
                {{ modal_remove_item.author }}
              </div>
            </div>
          </div>
        </template>
        <template #actions>
          <button
            class="modal-btn basket__btn"
            @click="modal_remove_close"
          >
            <span class="material-icons">clear</span>
          </button>
          <button
            class="modal-btn basket__btn"
            @click="modal_remove_accept"
          >
            <span class="material-icons">done</span>
          </button>
        </template>
      </modal-confirm>

      <modal-confirm
        v-model="modal_clearbasket_view"
        class="modal-clearbasket"
      >
        <template #head>
          <span>Вы действительно хотите очистить корзину?</span>
        </template>
        <template #actions>
          <button
            class="modal-btn basket__btn"
            @click="modal_clear_close"
          >
            <span class="material-icons">clear</span>
          </button>
          <button
            class="modal-btn basket__btn"
            @click="modal_clear_accept"
          >
            <span class="material-icons">done</span>
          </button>
        </template>
      </modal-confirm>
    </template>
  </div>
</template>

<script>
// import { mapMutations } from 'vuex'
import { mapGetters } from 'vuex'

import BookControl from '../components/bookControl'
import ModalConfirm from '../components/modalConfirm'
export default {
	name: 'Basket',
	head: () => ({
		title: 'Р* Корзина'
	}),
	components: {
		ModalConfirm,
		BookControl
	},
	data: () => ({
		modal_remove_view: false, //отображение модального окна с удалением книги
		modal_remove_item: { //данные для модального окна удаления книги
			id: -1,
			image: '',
			title: '',
			author: ''
		},
		modal_clearbasket_view: false //отображение модального окна очистки корзины
	}),
	methods: {
		// TODO: добавить метод для открытия страницы с информацией товара ???
		book_inc (id) {
			//добавить одну книгу в корзине по id
			this.$store.commit('basket/add_one_book', id)
		},
		book_dec (id) {
			//удалить одну книгу из корзины по id
			let count = this.$store.getters['basket/getBasketCountById'](id)
			if (count > 1) {
				this.$store.commit('basket/remove_one_book', id)
			} else {
				this.modal_remove_open(id)
			}
		},
		book_remove (id) {
			//удалить книгу из корзины
			this.$store.commit('basket/remove_book', id)
		},

		modal_remove_open (id) {
			//при открытии модального окна подтверждения удаления книги
			//заполняются данные о книге
			if (parseInt(id) > 0) {
				let book = this.all_books.find(x => x.id === parseInt(id))
				this.modal_remove_item.id = id
				this.modal_remove_item.title = book.title
				this.modal_remove_item.author = book.author
				this.modal_remove_item.image = book.image
				this.modal_remove_view = true
			}
		},
		modal_remove_close () {
			//закрытие модал окна удаления книги
			this.modal_remove_view = false
		},
		modal_remove_accept () {
			//если пользователь согласился удалить книгу
			this.book_remove(this.modal_remove_item.id)
			this.modal_remove_close()
		},

		modal_clear_close () {
			//открытие модал окна очистки корзины
			this.modal_clearbasket_view = false
		},
		modal_clear_accept () {
			//подтверждение очистки корзины
			this.$store.commit('basket/clean_basket')
			this.modal_clear_close()

			// TODO: вернуться в каталог для выбора товара
			// setTimeout(()=>{
			// 	this.$router.push('/');
			// }, 1500)
		}
	},
	computed: {
		...mapGetters({
			all_books: 'basket/getBasket'
		}),
		sum_total () {
			//свойство вернёт сумму всей корзины с учетом кол-ва каждого товара
			let result = 0
			for (let i = 0; i < this.all_books.length; i += 1) {
				let item = this.all_books[i]
				let sum = (+item.count) * (+item.price)
				result += sum
			}
			return result
		}
	}
}
</script>

<style lang="scss">
	@import '@/assets/variables.scss';

	/* для всех кнопок в корзине ("в каталог", "очистить корзину") */
	.basket .basket__btn {
		@include main_font;

		font-size: 11px;
		cursor: pointer;
		min-width: 32px;
		min-height: 28px;
		border: none;
		border-radius: 4px;
		background: $blue-dark;
		color: $main-color;
		width: 116px;
		padding: 4px 8px;
		box-sizing: unset;

		&:focus {
			outline: none;
		}

		&:hover {
			/* <!--color: $gray;--> */
			background: $blue-light;
		}
	}

	/* для кнопок управления */

	/* добавить убалить удалить книгу */
	.basket button:not(.btn-clean):not(.basket-empty__btn):not(.basket__btn) {
		background: transparent;
		padding: 0;
		margin: 0;
		border-width: 1px;
		border: none;
		width: 30px;
		cursor: pointer;

		&:focus {
			outline: none;
			border: none;
		}

		.material-icons {
			line-height: 28px;
		}
	}

	/* шаблон пустая корзина */
	.basket-empty {
		width: 100%;
		text-align: center;
		margin: 32px 0;

		.basket-empty__title {
			@include main_font;

			font-size: 28px;
		}

		.basket-empty__btn {
			margin-top: 16px;
		}
	}

	/* для элементов корзины */
	.basket-elem {
		height: 200px;
		padding: 8px;
		margin: 16px 0;
		display: flex;
		align-items: center;
		flex-direction: row;

		.basket-elem__image {
			width: 20%;
			height: 100%;
			padding: 8px;
			margin: 0 8px 0 0;
			box-sizing: border-box;
			text-align: center;
			display: flex;

			.basket-elem__img {
				max-height: 100%;
				max-width: 100%;
				margin: auto;
			}
		}

		.basket-elem__info {
			width: 50%;
			padding: 8px 16px;

			.basket-elem__title {
				@include main_font();

				font-size: 24px;
				margin-bottom: 8px;
			}

			.basket-elem__author {
				@include main_font();

				font-size: 18px;
				margin-bottom: 8px;
				color: $blue;
			}
		}

		.basket-elem__tools {
			width: 30%;
			height: 100%;
			justify-content: flex-end;
			padding: 8px 0;

			.basket-elem__tools-control {
				width: 100px;
				height: 28px;
				display: flex;
				align-items: center;
				justify-content: space-evenly;

				.btn-control {
					outline: none;
					border: none;
				}
			}

			.basket-elem__price {
				@include main_font();

				font-size: 24px;
				line-height: 28px;
				margin: 0 8px;
			}

			.basket-elem__count {
				@include main_font;

				font-size: 18px;
				width: 40%;
				height: 100%;
				text-align: center;
				background: $gray-light;
			}

			.basket-elem__remove {
				height: 28px;
				width: 28px;
				border-radius: 50%;
				border: 1px solid $blue-dark;
				outline: none;

				.btn-control {
					width: 100%;
					height: 100%;

					.material-icons {
						margin-right: 2px;
					}
				}
			}
		}

		.basket-elem__tools,
		.basket-elem__tools-control {
			display: flex;
			align-items: center;
			flex-direction: row;
			justify-content: space-between;
		}
	}

	/* блок с кнопкой "очистить корзину" и сумма корзины */

	/* TODO: сместить кнопку относительно центра изображении товаров ??? */
	.basket-footer {
		padding: 8px;
		margin-top: 16px;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.basket-footer__sum-total {
			@include main_font;

			font-size: 18px;

			.basket-footer__sum-value {
				color: $blue;
			}
		}
	}

	/* для модалки подтверждения удаления товара */
	.modal-confirm {
		.basket-elem {
			min-height: 100px;
			height: unset;
			margin: 0;
			padding: 0;

			.basket-elem__info {
				width: 70%;
			}

			* {
				font-size: 14px !important;
			}
		}

		.modal-btn {
			width: 35px;
			height: 35px;
			border-radius: 4px;
			background: transparent;
			color: $blue-dark;
			padding: 4px;

			.material-icons {
				font-size: 26px;
				line-height: 35px;
			}

			&:hover {
				background: $gray-light;
				color: $blue-dark;
			}
		}
	}

	/* для модалки подтверждения очистки корзины */
	.modal-clearbasket {
		.modal__head {
			text-align: center;
		}
	}

</style>
