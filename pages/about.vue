<template>
  <div>
    <h1>About books</h1>
  </div>
</template>

<script>
	import * as axios from 'axios'
export default {
	name: 'About',
	async asyncData({$http, params}){
		console.log(params)
		let book_info = {},
			sku = params.sku;
		await await axios({
			url: 'https://www.respublica.ru/api/v1/items/get/' + sku,
			methods: 'get'
		})
			.then(response => {
				console.log(response);
				book_info = response.data;
			})
			.catch(error => console.error(error));
		return { book_info }
	},
	methods: {
		async get_info_book(sku){
			await axios({
				url: 'https://www.respublica.ru/api/v1/items/get/' + sku,
				methods: 'get'
			})
				.then(response => {
					console.log(response);
				})
				.catch(error => console.error(error))
		}
	},
	beforeMount(){
		// console.log(this.$route.params.sku);
		// this.get_info_book(this.$route.params.sku)
	}
}
</script>

<style scoped>

</style>
