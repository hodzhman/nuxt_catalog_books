<template>
  <div class="book">
    <div class="book__img">
      <img @click="$router.push({name: 'about_book', params: {sku: bookInfo.attributes.sku}})"
		   :src="'https://www.respublica.ru/'+bookInfo.attributes.image.media.url"
	  >
    </div>

	  <div class="photo" v-if="false">
		  <div class="photo-wrapper">
			  <img
				  @click="$router.push({name: 'about_book', params: {sku: bookInfo.attributes.sku}})"
				  :src="'https://www.respublica.ru/'+bookInfo.attributes.image.media.url"
				  :alt="bookInfo.attributes.title"
				  class="photo-img"
			  >
		  </div>
	  </div>


    <div class="book__title"
		 @click="$router.push({name: 'about_book', params: {sku: bookInfo.attributes.sku}})"
	>
      {{ bookInfo.attributes.title }}
    </div>
    <div class="book__author">
      {{ author }}
    </div>
    <div class="book__tools">
      <div class="book__price">
        {{ bookInfo.attributes.price }} <template v-if="bookInfo.attributes.price">&#8381;</template>
      </div>
      <div class="book__add-basket add-basket">
        <button
          class="add-basket__btn"
		  @click="add_to_basket"
        >
          В корзину
        </button>
      </div>
    </div>
  </div>
</template>

<script>
	import { mapMutation } from 'vuex'
export default {
	name: 'Book',
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
		author() {
			return (this.bookInfo.attributes.manufacturer.title) ? this.bookInfo.attributes.manufacturer.title : '';
		}
	},
	methods: {
		add_to_basket(){
			let book = {
				id: this.bookInfo.id,
				title: this.bookInfo.attributes.title,
				author: this.author,
				image: this.bookInfo.attributes.image.media.url,
				price: this.bookInfo.attributes.price,
			};
			this.$store.commit('basket/add_book', book);

			// случай ниже не работает!
			// this.$store.commit.basket.add_book(book);
		}
	}
}
</script>

<style lang="scss">
	@import '@/assets/variables.scss';
	.book {
		width: calc((900px / 4) - 56px);
		padding: 16px;
		margin: 8px;
		display: flex;
		position: static;
		flex-flow: column;
		align-items: center;
		align-items: start;
		justify-content: start;

		.book__img {
			cursor: pointer;
			img {
				width: 200px;
				border-radius: 4px;
				&:hover{
					box-shadow: 0 0 5px 0px #0000008a;
				}
			}
		}

		.book__title{
			cursor: pointer;
			@include main_font();
		}

		.book__author{
			@include main_font();
			color: $blue;
			font-size: 12px;
		}

		.book__tools {
			width: 100%;
			flex-flow: row;
			display: flex;
			justify-content: space-between;
			.book__add-basket *{
				cursor: pointer;
				border-radius: 4px;
			}
		}
	}

	.photo{
		position: static;
		z-index: 1;
		padding-top: 100%;
		margin-bottom: 1rem;
		.photo-wrapper{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			.photo-img{
				display: block;
				max-width: 100%;
				max-height: 100%;
			}
		}
	}
</style>
