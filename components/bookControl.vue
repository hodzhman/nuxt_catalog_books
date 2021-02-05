<template>
    <div class="control">
		{{count_book}}
		<template v-if="view_btn_add">
			<button
				@click="add_to_basket"
			>В корзину</button>
		</template>
		<template v-else>
			<div class="container">
				<div class="control__count">
					<button
						@click="book_dec"
					>-</button>
				</div>
				<div class="control__label">
					{{count_book}}
				</div>
				<div class="control__count">
					<button
						@click="book_inc"
					>+</button>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
	import { mapMutations } from 'vuex';
	import { mapGetters } from 'vuex';
    export default {
        name: "book-control",
		props: {
        	id: {
        		type: String,
				required: true
			},
			attr: {
        		type: Object,
				required: false
			},
			flagChangeView: {
        		type: Boolean,
				required: false,
				default(){
        			return true
				}
			}
		},
		data: ()=>({
			view: false
		}),
		computed:{
        	view_btn_add(){
        		let flag = true;

        		return true;
			},
			...mapGetters({
				count_book: ['basket/getBasketCountById'](this.id)
			}),
			// count_book(){
        		// this.$store.getters.basket.getBasketCountById(this.id)
			// },
		},
		methods: {
        	add_to_basket(){
        		// добавить книгу в корзину
        		let author = (this.attr.manufacturer.title) ? this.attr.manufacturer.title : '',
					item = {
					id: String(this.id),
					title: this.attr.title,
					author: author,
					image: "item.image",
					price: this.attr.price,
				};
        		this.$store.commit('basket/add_book', item);
			},
			book_inc(){
        		this.$store.commit('basket/add_one_book', this.id);
			},
			book_dec(){
        		this.$store.commit('basket/remove_one_book', this.id);
			}
		}
    }
</script>

<style scoped>
	.control{
		border: 1px solid black;
	}
</style>
