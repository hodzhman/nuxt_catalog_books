<template>
  <div class="book">
    <div class="book__img">
		<nuxt-link
			class="book__img-link"
			:to="{name: 'about_book', params: {sku: bookInfo.attributes.sku}}"
			tag="a"
		>
			<img :src="'https://www.respublica.ru/'+bookInfo.attributes.image.media.url"
				 :alt="bookInfo.attributes.title"
			>
		</nuxt-link>
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
        {{ bookInfo.attributes.price }} <template v-if="bookInfo.attributes.price">&#8381;</template>
      </div>
      <div class="book__add-basket add-basket">
		  <book-control
			  :id="bookInfo.attributes.id"
			  :attr="bookInfo.attributes"
		  ></book-control>
      </div>
    </div>
  </div>
</template>

<script>
	import { mapMutation } from 'vuex'
	import BookControl from '@/components/bookControl.vue'
export default {
	name: 'Book',
	components:{
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
		author() {
			return (this.bookInfo.attributes.manufacturer.title) ? this.bookInfo.attributes.manufacturer.title : '';
		}
	},
	methods: {
		add_to_basket(){
			// let book = {
			// 	id: this.bookInfo.id,
			// 	title: this.bookInfo.attributes.title,
			// 	author: this.author,
			// 	image: this.bookInfo.attributes.image.media.url,
			// 	price: this.bookInfo.attributes.price,
			// };
			// this.$store.commit('basket/add_book', book);
		}
	}
}
</script>

<style lang="scss">
	@import '@/assets/variables.scss';
	.book {
		width: (($container-width / 4) - 16 - 32);
		padding: 16px;
		margin: 8px;
		margin-bottom: 16px;
		display: flex;
		flex-flow: column;
		align-items: start;
		justify-content: start;
		/*height: 400px;*/
		min-height: 340px;
		box-sizing: content-box;
		@include position(relative);

		.book__img {
			cursor: pointer;
			height: 250px;
			width: 100%;
			display: flex;
			padding: 8px;
			box-sizing: border-box;
			.book__img-link{
				height: 100%;
				text-decoration: none;
				margin: auto;
			}
			img {
				max-height: 100%;
				max-width: 100%;
				border-radius: 4px;
				margin: auto;
				&:hover{
					box-shadow: 0 0 5px 0px #0000008a;
				}
			}
		}

		.book__title{
			cursor: pointer;
			@include main_font();
			text-decoration: none;
		}

		.book__author{
			@include main_font();
			color: $blue;
			font-size: 12px;
			margin-bottom: 32px;
		}

		.book__tools {
			width: calc(100% - 32px);
			flex-flow: row;
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
			margin-top: 8px;
			position: absolute;
			bottom: 0;
			.book__price{
				@include main_font();
				font-size: 18px;
				line-height: 38px;
			}
			.book__add-basket .control{
				width: 100px;
			}
			.book__add-basket *{
				cursor: pointer;
				border-radius: 4px;
			}
		}
	}

	.photo{
		@include position(static);
		z-index: 1;
		padding-top: 100%;
		margin-bottom: 1rem;
		.photo-wrapper{
			@include position(absolute);
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
