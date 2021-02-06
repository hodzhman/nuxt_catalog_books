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
					  :src="'https://www.respublica.ru/'+book.image"
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
				  <div class="basket-elem__price">
					  {{book.price}} <span>&#8381;</span>
				  </div>
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
	.basket-elem{
		padding: 8px;
		margin: 16px 0;
		display: flex;
		align-items: center;
		flex-direction: row;
		.basket-elem__image{
			width: 15%;
		}
		.basket-elem__info{
			width: 45%;
		}
		.basket-elem__tools{
			width: 40%;
			justify-content: flex-end;
		}
		.basket-elem__tools,
		.basket-elem__tools-control{
			display: flex;
			align-items: center;
			flex-direction: row;
		}
	}
</style>
