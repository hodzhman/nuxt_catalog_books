<template>
  <div class="basket">
	  <template v-if="all_books.length === 0">
		  <h2>Корзина пуста!</h2>
	  </template>
	  <template v-else>
		  <div class="basket-elem"
			   v-for="book in all_books"
			   :key="book.id"
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
					  {{book.title}}
				  </div>
				  <div class="basket-elem__author">
					  {{book.author}}
				  </div>
			  </div>
			  <div class="basket-elem__tools">
				  <div class="basket-elem__tools-control">
					  <button class="btn-control"
							  @click="book_dec(book.id)"
					  >
						  <span class="material-icons">remove</span>
					  </button>
					  <div class="basket-elem__count">
						  {{book.count}}
					  </div>
					  <button class="btn-control"
							  @click="book_inc(book.id)"
					  >
						  <span class="material-icons">add</span>
					  </button>
				  </div>
				  <div class="basket-elem__price">
					  {{book.price}} <span>&#8381;</span>
				  </div>
				  <div class="basket-elem__remove">
					  <button class="btn-control"
							  @click="book_remove(book.id)"
					  >
						  <span class="material-icons">clear</span>
					  </button>
				  </div>
			  </div>
		  </div>
		  <div class="basket-info__sum-total">
			  Общая стоимость: <span class="basket-info__sum-value">{{sum_total}} &#8381; </span>
		  </div>


	  </template>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { mapGetters } from 'vuex'
import BookControl from '@/components/bookControl.vue'
export default {
	name: 'Basket',
	head: () => ({
		title: 'Р* Корзина'
	}),
	components:{
		BookControl
	},
	computed: {
		...mapGetters({
			all_books: 'basket/getBasket'
		}),
		sum_total(){
			let result = 0;
			for(let i = 0; i < this.all_books.length; i += 1){
				let item = this.all_books[i],
					sum = (+item.count) * (+item.price);
				result += sum;
			}
			return result;
		}
	},
	methods: {

		book_inc(id){
			this.$store.commit('basket/add_one_book', id);
		},
		book_dec(id){
			this.$store.commit('basket/remove_one_book', id);
		},
		book_remove(id){
			this.$store.commit('basket/remove_book', id);
		}
	}
}
</script>

<style scoped lang="scss">
	@import '@/assets/variables.scss';

	button{
		background: transparent;
		padding: 0;
		margin: 0;
		border-width: 1px;
		border: none;
		width: 30px;
		cursor: pointer;
		&:focus{
			outline: none;
			border: none;
		}
		.material-icons{
			line-height: 28px;
		}
	}



	.basket-elem{
		height: 200px;
		padding: 8px;
		margin: 16px 0;
		display: flex;
		align-items: center;
		flex-direction: row;

		.basket-elem__image{
			width: 20%;
			height: 100%;
			padding: 8px;
			margin: 0 8px 0 0;
			box-sizing: border-box;
			text-align: center;
			display: flex;
			.basket-elem__img{
				max-height: 100%;
				max-width: 100%;
				margin: auto;
			}
		}

		.basket-elem__info{
			width: 50%;
			padding: 8px 16px;
			.basket-elem__title{
				@include main_font();
				font-size: 24px;
				margin-bottom: 8px;
			}
			.basket-elem__author{
				@include main_font();
				font-size: 18px;
				margin-bottom: 8px;
				color: $blue;
			}
		}
		.basket-elem__tools{
			width: 30%;
			height: 100%;
			justify-content: flex-end;
			padding: 8px 0;
			.basket-elem__tools-control{
				width: 100px;
				height: 28px;
				display: flex;
				align-items: center;
				justify-content: space-evenly;
				.btn-control{
					outline: none;
					border: none;
				}
			}
			.basket-elem__price{
				@include main_font();
				font-size: 24px;
				line-height: 28px;
				margin: 0 8px;
			}
			.basket-elem__count{
				font-size: 18px;
				width: 40%;
				height: 100%;
				text-align: center;
				background: $gray-light;
			}
			.basket-elem__remove{
				height: 28px;
				width: 28px;
				border-radius: 50%;
				border: 1px solid $blue-dark;
				outline: none;
				/*top: -80px;*/
				/*right: 0;*/
				/*position: relative;*/
				.btn-control{
					width: 100%;
					height: 100%;
				}
			}
		}
		.basket-elem__tools,
		.basket-elem__tools-control{
			display: flex;
			align-items: center;
			flex-direction: row;
			justify-content: space-between;
		}
	}
</style>
