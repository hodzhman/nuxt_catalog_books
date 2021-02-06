<template>
    <div
		class="control"
		:class="block ? 'control_full-width' : ''"
	>
		<template v-if="view_btn_add">
			<div class="container">
				<div class="control__count">
					<button
						class="control__btn"
						:class="count_book === 0 ? 'control__btn_disabled' : ''"
						@click="book_dec"
					>
						<span class="material-icons">remove</span>
					</button>
				</div>
				<div class="control__label">
					{{count_book}}
				</div>
				<div class="control__count">
					<button
						class="control__btn"
						@click="book_inc"
					>
						<span class="material-icons">add</span>
					</button>
				</div>
			</div>
		</template>
		<template v-else>
			<button
				class="control__btn control__btn_block control__btn-basket"
				@click="add_to_basket"
			>В корзину</button>
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
        		type: Number,
				required: true
			},
			attr: {
        		type: Object,
				required: true
			},
			flagChangeView: {
        		type: Boolean,
				required: false,
				default(){
        			return false
				}
			},
			block: {
        		type: Boolean,
				required: false,
				default(){
        			return false
				}
			}
		},
		data: ()=>({
			view: false
		}),
		computed:{
        	view_btn_add(){
                // console.log('view_btn_add', this.flagChangeView, this.$store.getters['basket/getBasketCountById'](this.id));
                // console.log( (this.flagChangeView && this.$store.getters['basket/getBasketCountById'](this.id) > 0));
        		return (this.flagChangeView && this.$store.getters['basket/getBasketCountById'](this.id) > 0);
			},
			count_book(){
        		return this.$store.getters['basket/getBasketCountById'](this.id);
			}
		},
		methods: {
        	add_to_basket(){
        		// добавить книгу в корзину
        		let author = (this.attr.manufacturer.title) ? this.attr.manufacturer.title : '',
					item = {
						id: this.id,
						title: this.attr.title,
						author: author,
						image: ('https://www.respublica.ru/'+this.attr.image.media.url),
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

<style scoped lang="scss">
	@import "@/assets/variables.scss";

	.control__btn{
		border: none;
		background: transparent;
		padding: 0px;
		margin: 0px;
		cursor: pointer;
		min-width: 32px;
		min-height: 28px;
		&:focus{
			outline: none;
		}
		&.control__btn_disabled{
			cursor: not-allowed;
			pointer-events: none;
		}
		&.control__btn_block{
			width: 100%;
		}
	}
	.control{
		border: 1px solid black;
		border-radius: 4px;
		background: $blue-dark;
		width: 116px;
		padding: 4px;
		*{
			color: $main-color;
		}
		*:hover:not(.control__label){
			color: $gray;
		}
		&.control_full-width{
			width: 100%;
		}
		.container{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.control__btn{
				display: flex;
				.material-icons{
					margin: auto;
				}
			}
		}
	}
</style>
