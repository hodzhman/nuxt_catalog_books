<template>
  <div
    class="control"
    :class="[block ? 'control_full-width' : '', view_btn_add ? 'control_control-count' : 'control_control-to-basket']"
  >
    <template v-if="view_btn_add">
      <div class="container">
        <div class="control__count">
          <button
            class="control__btn"
            :class="count_book === 0 ? 'control__btn_disabled' : ''"
            @click="book_dec"
          >
            <span class="material-icons">remove</span>
          </button>
        </div>
        <div class="control__label">
          {{ count_book }}
        </div>
        <div class="control__count">
          <button
            class="control__btn"
            @click="book_inc"
          >
            <span class="material-icons">add</span>
          </button>
        </div>
      </div>
    </template>
    <template v-else>
      <button
        class="control__btn control__btn_block control__btn-basket"
        @click="add_to_basket"
      >
        В корзину
      </button>
    </template>
  </div>
</template>

<script>
export default {
	name: 'BookControl',
	props: {
		id: {
			// id книги
			type: Number,
			required: true
		},
		attr: {
			// атрибуты и характеристики книги
			type: Object,
			required: true
		},
		flagChangeView: {
			// флаг отвечает за необходимость переключения внешнего вида
			// "В корзину" или " - N + "
			type: Boolean,
			required: false,
			default () {
				return false
			}
		},
		block: {
			// флаг для размещения блока по всей ширине
			type: Boolean,
			required: false,
			default () {
				return false
			}
		}
	},
	computed: {
		view_btn_add () {
			// свойство отвечает за внешний вид кнопки
			// форма 1: "В корзину"
			// форма 2: " - N + "
			return (this.flagChangeView && this.$store.getters['basket/getBasketCountById'](this.id) > 0)
		},
		count_book () {
			// функция вернёт колво книг в корзине по id
			return this.$store.getters['basket/getBasketCountById'](this.id)
		}
	},
	methods: {
		add_to_basket () {
			// добавить книгу в корзину
			let author = (this.attr.manufacturer.title) ? this.attr.manufacturer.title : ''
			let item = {
				id: this.id,
				title: this.attr.title,
				author,
				image: ('https://www.respublica.ru/' + this.attr.image.media.url),
				price: this.attr.price
			}
			this.$store.commit('basket/add_book', item)
		},
		book_inc () {
			// + 1 книга в корзине по id
			this.$store.commit('basket/add_one_book', this.id)
		},
		book_dec () {
			// - 1 книга в корзине по id
			this.$store.commit('basket/remove_one_book', this.id)
		}
	}
}
</script>

<style scoped lang="scss">
	@import "@/assets/variables.scss";

	/* тег для всех кнопок компонента */
	.control__btn {
		@include main_font;

		font-size: 11px;
		border: none;
		background: transparent;
		padding: 0;
		margin: 0;
		cursor: pointer;
		min-width: 32px;
		min-height: 28px;

		&:focus {
			outline: none;
		}

		/* если на кнопка отключена и не доступна для нажатия */
		&.control__btn_disabled {
			cursor: not-allowed;
			pointer-events: none;
		}

		&.control__btn_block {
			width: 100%;
		}
	}

	/* родительский тег компонента */
	.control {
		border-radius: 4px;
		background: $blue-dark;
		width: 116px;
		padding: 4px;

		.container *:not(.material-icons) {
			@include main_font;
		}

		* {
			color: $main-color !important;
		}

		&.control_full-width {
			width: 100%;
		}

		/* тег для 2 формы с кнопками - и + */
		.container {
			display: flex;
			justify-content: space-between;
			align-items: center;

			/* отдельные кнопки */
			.control__btn {
				border-radius: 2px;
				display: flex;

				.material-icons {
					margin: auto;
				}
			}
		}
	}

	/* заливка при наведении */
	.control:hover:not(.control_control-count),
	.control:not(.control_control-to-basket) .control__btn:hover {
		background: $blue-light;
	}

</style>
