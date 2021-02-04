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
			required: true,
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

<style lang="scss">
	.book {
		width: calc((900px / 4) - 56px);
		padding: 16px;
		margin: 8px;
		display: flex;
		flex-flow: column;
		align-items: center;
		justify-content: start;

		.book__img {
			img {
				width: 200px;
			}
		}

		.book__tools {
			width: 100%;
			flex-flow: row;
			display: flex;
			justify-content: space-between;
		}
	}
</style>
