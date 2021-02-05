<template>
  <div class="basket">
    <h1>Корзина</h1>
	  <template>
		  <ul v-if="all_books.length > 0">
			  <li v-for="book in all_books"
				  :key="book.id"
			  >
				  {{book.id}} - {{book.title}} - {{book.count}}
			  </li>
		  </ul>
		  <h2 v-else>Корзина пуста!</h2>
	  </template>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { mapGetters } from 'vuex'
export default {
	name: 'Basket',
	head: () => ({
		title: 'Р* Корзина'
	}),
	computed: {
		...mapGetters({
			all_books: 'basket/getBasket'
		}),
		counter(){
			return this.$store.state.store.counter;
		},
		// all_books(){
		// 	console.log('all_books.length = ', this.$store.state.basket.all_books.length);
		// 	console.log('all_books.length = ', this.getBasket);
		// 	return this.$store.state.basket.all_books;
		// }
	},
	methods: {
		increment(){
			this.$store.commit('store/increment');
		}
	}
}
</script>

<style scoped>

</style>
