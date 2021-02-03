<template>
  <div>
    <h1>Home page</h1>
    <hr>
	  <div class="catalog__books">
		  <book
			  v-for="item in books"
			  :key="item.id"
			  :book-info="item"
		  />
	  </div>
  </div>
</template>

<script>
import Book from '@/components/book.vue'
import * as axios from 'axios'
export default {
	components: {
		Book
	},
	async asyncData () {
		// let books = [];
		// await axios
		// 	.get('https://www.respublica.ru/api/v1/listing/knigi?_page=1')
		// 	.then(response => ({
		// 		if (response) {
		// 			console.log(response);
		// 			books = response.items.data;
		// 		}
		// 	}))
		// 	.catch(error => console.error(error));
		// return {books}
	},
	data: () => ({
		books: []
	}),
	mounted () {
		this.getBooks()
	},
	methods: {
		async getBooks () {
			console.log('getBooks()', this._data, this.books)
			await axios
				.get('https://www.respublica.ru/api/v1/listing/knigi?_page=1')
				.then((response) => {
					console.log(response)
					this.books = response.data.items.data
					console.log(this.books)
				})
				.catch(error => console.error(error))
		}
	}
}
</script>

<style scoped lang="scss">
	hr {
		margin: 2rem 0;
	}

	.catalog__books {
		display: flex;
		float: left;
	}
</style>
