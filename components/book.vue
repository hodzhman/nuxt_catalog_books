<template>
  <div class="book">
    <div class="book__img">
      <img :src="'https://www.respublica.ru/'+bookInfo.attributes.image.media.url">
    </div>
    <div class="book__title">
      {{ bookInfo.attributes.title }}
    </div>
    <div class="book__tools">
		<div class="book__price">
			{{bookInfo.attributes.last_price}}
		</div>
		<div class="book__add-basket add-basket">
			<button
				class="add-basket__btn"
			>Добавить в корзину</button>
		</div>
    </div>
  </div>
</template>

<script>
export default {
	name: 'Book',
	props: {
		bookInfo: {
			type: Object,
			required: false,
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
	}
}
</script>

<style scoped lang="scss">
	.book {
		width: 25%;

		.book__img {
			img {
				width: 200px;
			}
		}

		.book_tools {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}
</style>
