<template>
  <div class="book">
    <div class="book__img">
      <nuxt-link
        class="book__img-link"
        :to="{name: 'about_book', params: {sku: bookInfo.attributes.sku}}"
        tag="a"
      >
        <img
          :src="'https://www.respublica.ru/'+bookInfo.attributes.image.media.url"
          :alt="bookInfo.attributes.title"
          class="book_img-cover"
        >
      </nuxt-link>
    </div>
    <nuxt-link
      class="book__title"
      tag="a"
      :to="{name:'about_book', params: {sku: bookInfo.attributes.sku}}"
    >
      {{ bookInfo.attributes.title }}
    </nuxt-link>
    <div class="book__author">
      {{ author }}
    </div>
    <div class="book__tools">
      <div class="book__price">
        {{ bookInfo.attributes.price }} <template v-if="bookInfo.attributes.price">
          &#8381;
        </template>
      </div>
      <div class="book__add-basket add-basket">
        <book-control
          :id="bookInfo.attributes.id"
          :attr="bookInfo.attributes"
        />
      </div>
    </div>
  </div>
</template>

<script>
// import { mapMutation } from 'vuex'
import BookControl from '@/components/bookControl.vue'
export default {
	name: 'Book',
	components: {
		BookControl
	},
	props: {
		bookInfo: {
			type: Object,
			required: true,
			default () {
				return {
					type: 'null',
					id: 'null',
					attributes: {
						title: 'null'
					}
				}
			}
		}
	},
	computed: {
		author () {
			// функция для вывода автора
			// возможно изменить формат на Фамилия И.О , но не у всех записей корректные данные
			return (this.bookInfo.attributes.manufacturer && this.bookInfo.attributes.manufacturer.title) ? this.bookInfo.attributes.manufacturer.title : ''
		}
	}
}
</script>

<style lang="scss">
	@import '@/assets/variables.scss';

	/* элемент товар для каталога */
	.book {
		width: (($container-width / 4) - 16 - 32);
		padding: 16px;
		margin: 8px;
		margin-bottom: 16px;
		display: flex;
		flex-flow: column;
		align-items: start;
		justify-content: start;

		/* height: 400px; */
		min-height: 340px;
		box-sizing: content-box;

		@include position(relative);

		/* тег с изображением книги и ссылкой на страницу информации */
		.book__img {
			cursor: pointer;
			height: 250px;
			width: 100%;
			display: flex;
			padding: 8px;
			box-sizing: border-box;

			/* тег с ссылкой на страницу информации */
			.book__img-link {
				height: 100%;
				text-decoration: none;
				margin: auto;
			}

			/* изображение */
			.book_img-cover {
				max-height: 100%;
				max-width: 100%;
				border-radius: 4px;
				margin: auto;

				&:hover {
					box-shadow: 0 0 5px 0 #0000008a;
				}
			}
		}

		/* название книги */
		.book__title {
			cursor: pointer;

			@include main_font();

			text-decoration: none;
		}

		/* автор книги */
		.book__author {
			@include main_font();

			color: $blue;
			font-size: 12px;
			margin-bottom: 32px;
		}

		/* тег для цены и кнопки добавить */
		.book__tools {
			width: calc(100% - 32px);
			flex-flow: row;
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
			margin-top: 8px;
			position: absolute;
			bottom: 0;

			/* цена книги */
			.book__price {
				@include main_font();

				font-size: 18px;
				line-height: 38px;
			}

			/* кнопка добавить */
			.book__add-basket .control {
				width: 100px;
			}

			.book__add-basket * {
				cursor: pointer;
				border-radius: 4px;
			}
		}
	}
</style>
