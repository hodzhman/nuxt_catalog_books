<template>
	<div class="about-book">
		<div class="about-book__top">
			<div class="about-book__img image-slider">
				div с главным изображением и слайдер
			</div>
			<div class="about-book__info book-info">
				<div class="book-info__title">
					{{bookInfo.attributes.title}}
				</div>
				<div class="book-info__author">
					{{author}}
				</div>
				<div class="book-info__tools">
					<div class="book-info__price">
						{{bookInfo.attributes.price}} <template v-if="bookInfo.attributes.price">&#8381;</template>
					</div>
					<book-control
						:id="bookInfo.attributes.id"
						:attr="bookInfo.attributes"
						flagChangeView
					></book-control>
				</div>
				<div class="book-info__properties">
					<div
						v-for="(pr, i) in properties"
						:key="i"
						class="book-info__property"
					>
						<div class="book-info__property-title">{{pr.title}}</div>
						<div class="book-info__property-value">{{pr.value}}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="about-book__bottom">
			<div
				class="about-book__description"
				v-html="bookInfo.attributes.description"
			>
				{{bookInfo.attributes.description}}
			</div>
			<div class="about-book__other-books">
				другие книги
			</div>
		</div>
	</div>
</template>

<script>
	import BookControl from '@/components/bookControl.vue'
	import * as axios from 'axios';
	import { mapGetters } from 'vuex';
	import { mapMutations } from 'vuex';
    export default {
        name: "about-book",
		components:{
        	BookControl
		},
		async asyncData({$http, params}){
        	let bookInfo = {},
				imageBook = {},
				sku = params.sku;
			await axios({
				method: 'get',
				url: 'https://www.respublica.ru/api/v1/items/get/' + String(sku)
			})
				.then(response => {
					if(response.data){
						console.log('response.data',response.data);
						bookInfo = response.data.item.data;
						imageBook = response.data.images.data;
					}
				})
				.catch(error => console.error(error));
			return {bookInfo, imageBook};
		},
		head: () => ({
			title: 'R° Информация о товаре'
		}),
		data: ()=>({
			bookInfo: null,
			imageBook: null
		}),
		methods:{
			test(){
				this.$store.commit('basket/add_book', {
					id: this.bookInfo.attributes.id,
					title: this.bookInfo.attributes.title,
					author: this.bookInfo.attributes.manufacturer.title,
					image: '-',
					price: this.bookInfo.attributes.price,
					count: 1
				});
			},
			test2(){
				this.$store.commit('basket/add_one_book', this.bookInfo.attributes.id)
			}
		},
		computed:{
			author() {
				return (this.bookInfo.attributes.manufacturer.title) ? this.bookInfo.attributes.manufacturer.title : '';
			},
			properties(){
				let result = [];
				if(this.bookInfo.attributes.json_properties.length > 0){
					result = this.bookInfo.attributes.json_properties.slice().sort((a, b)=>{
						if(a.title > b.title){
							return 1;
						}
						if(a.title < b.title){
							return -1;
						}
						return 0;
					});
				}
				return result;
			}
		}
    }
</script>

<style scoped lang="scss">
	@import '~assets/variables.scss';
	.about-book{

		.about-book__top{
			display: flex;
			flex-direction: row;
			margin-bottom: 32px;

			.about-book__img{
				width: 60%;
			}
			.about-book__info{

			}
		}
	}

	.book-info{
		.book-info__title{
			@include main_font();
			font-size: 32px;
		}
		.book-info__author{
			@include main_font();
			font-size: 18px;
			color: $blue;
		}
		.book-info__tools{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}
		.book-info__properties{

			.book-info__property{
				margin: 5px 0;
				display: flex;
				flex-direction: row;
				@include main_font();
				align-items: baseline;
				.book-info__property-title{
					color: $gray;
					font-size: 14px;
				}
				.book-info__property-value{
					font-size: 16px;
				}
			}

		}
	}
</style>
