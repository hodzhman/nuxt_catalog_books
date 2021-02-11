<template>
  <div class="about-book">
    <div class="about-book__top">
      <div class="about-book__image-container image-slider">
        <slider
          :data="imageBook"
        />
      </div>
      <div class="about-book__info book-info">
        <div class="book-info__title">
          {{ bookInfo.attributes.title }}
        </div>
        <div class="book-info__author">
          {{ author }}
        </div>
        <div class="book-info__tools">
          <div class="book-info__price">
            {{ bookInfo.attributes.price }} <template v-if="bookInfo.attributes.price">
              &#8381;
            </template>
          </div>
          <book-control
            :id="bookInfo.attributes.id"
            :attr="bookInfo.attributes"
            flag-change-view
          />
        </div>
        <div class="book-info__properties">
          <div
            v-for="(pr, i) in properties"
            :key="i"
            class="book-info__property"
          >
            <div class="book-info__property-title">
              {{ pr.title }}
            </div>
            <div class="book-info__property-value">
              {{ pr.value }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="about-book__bottom">
      <div class="about-book__decription">
        <div class="about-book__decription-title">
          Описание
        </div>
        <div
          class="about-book__decription-info"
          v-html="bookInfo.attributes.description"
        />
      </div>
      <div v-if="false" class="about-book__other-books">
        <!-- TODO: другие книги-->
      </div>
    </div>
  </div>
</template>

<script>
import BookControl from '@/components/bookControl'
import Slider from '@/components/slider'
import * as axios from 'axios'
// import { mapGetters, mapMutations } from 'vuex'

export default {
	name: 'AboutBook',
	head: () => ({
		title: 'R° Информация о товаре'
	}),
	components: {
		BookControl,
		Slider
	},
	async asyncData ({ $http, params }) {
		// TODO: если не правильный SKU книги то ошибка запроса!!! добавить страницу "товар не найден" или запрос вынести в beforeMount
        let bookInfo = {}
		let imageBook = []
		let sku = params.sku
		await axios({
			method: 'get',
			url: 'https://www.respublica.ru/api/v1/items/get/' + String(sku)
		})
			.then((response) => {
				if (response.data) {
					bookInfo = response.data.item.data
					let resp_img = response.data.images.data
					for (let key in resp_img) {
						imageBook.push({
							url: 'https://www.respublica.ru/' + resp_img[key].attributes.media.url
						})
					}
				}
			})
			.catch(error => console.error(error))
		return { bookInfo, imageBook }
	},
	data: () => ({
		bookInfo: null, // вся инфомарция о книге
		imageBook: null // массив с изображениями книги для слайдера
	}),
	computed: {
		author () {
			// вернёт имя автора
			return (this.bookInfo.attributes.manufacturer.title) ? this.bookInfo.attributes.manufacturer.title : ''
		},
		properties () {
			// вернёт отсортированный массив в характеристиками книги
			let result = []
			if (this.bookInfo.attributes.json_properties.length > 0) {
				result = this.bookInfo.attributes.json_properties.slice().sort((a, b) => {
					if (a.title > b.title) {
						return 1
					}
					if (a.title < b.title) {
						return -1
					}
					return 0
				})
			}
			return result
		}
	}
}
</script>

<style scoped lang="scss">
	@import '~assets/variables.scss';

	/* родительский тег вкладки */
	.about-book {
		margin-bottom: 32px;

		/* тег со слайдером и инфой о книге */
		.about-book__top {
			display: flex;
			flex-direction: row;
			margin-bottom: 32px;

			/* слайдер и инфа о книге */
			.about-book__image-container,
			.about-book__info {
				width: 480px;
				padding: 32px;
				box-sizing: border-box;
			}

			.about-book__image-container {
				display: inherit;

				.about-book__image {
					max-width: 280px;
					margin: auto;
				}
			}

			.about-book__info {
				margin-left: 16px;
			}
		}

		/* тег с описанием книги */
		.about-book__bottom {
			* {
				@include main_font;
			}

			.about-book__decription-title {
				//@include main_font();
				font-size: 28px;
				margin-bottom: 8px;
				border-bottom: 1px solid $gray;
			}
		}
	}

	/* блок с инфой о книге */
	.book-info {
		.book-info__title,
		.book-info__author,
		.book-info__tools {
			margin-bottom: 8px;
		}

		/* название книги */
		.book-info__title {
			@include main_font();

			font-size: 32px;
		}

		/* автор книги */
		.book-info__author {
			@include main_font();

			font-size: 18px;
			color: $blue;
		}

		/* элемент с ценой и кнопкой "в корзину" */
		.book-info__tools {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-bottom: 16px;

			/* цена книги */
			.book-info__price {
				@include main_font();

				font-size: 28px;
				margin-right: 16px;
			}
		}

		/* элемент с характеристиками книги */
		.book-info__properties {
			.book-info__property {
				width: 100%;
				margin: 8px 0;
				display: flex;
				flex-direction: row;

				@include main_font();

				align-items: baseline;

				/* наименование характеристки */
				.book-info__property-title {
					color: $gray;
					font-size: 14px;
					margin-right: 8px;
					width: 45%;
				}

				/* значение характеристики */
				.book-info__property-value {
					font-size: 16px;
					width: 50%;
				}
			}
		}
	}
</style>
