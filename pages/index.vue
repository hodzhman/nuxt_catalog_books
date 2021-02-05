<template>
  <div class="catalog">
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
	async asyncData ({ $http }) {
		let books = []
		console.log(books)
		await axios
			.get('https://www.respublica.ru/api/v1/listing/knigi?_page=1')
			.then((response) => {
				console.log(response)
				if (response) {
					books = response.data.items.data.slice(0, 12)
				}
			})
			.catch(error => console.error(error))
		console.log(books)
		return { books }
	},
	data: () => ({
		books: []
	}),
	head: () => ({
		title: 'R° Каталог'
	}),
	mounted () {
		// this.getBooks()
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
	.catalog{

	}

	.catalog__books {
		display: flex;
		flex-flow: wrap;
	}
</style>
