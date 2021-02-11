<template>
  <div class="slider-image slider">
    <div class="slider__active-image">
      <a
        v-if="selected_image"
        :href="selected_image.url"
        target="_blank"
        class="slider__active-image-link"
      >
        <img :src="selected_image.url" class="slider__active-image-cover">
      </a>
    </div>

    <div v-if="data.length > 1" class="slider__swap-container">
      <button
        class="slider-btn slider__swap-left"
        @click="slider_prev"
      >
        <span class="material-icons">keyboard_arrow_left</span>
      </button>
      <div class="slider__swap">
        <div
          v-for="img in data"
          :key="img.Id"
          class="slider__swap-image"
          :class="[(img.Selected ? 'silder__swap-image_active' : '')]"
          :data-id="img.Id"
          @click="select_image(img.Id)"
        >
          <img :src="img.url" class="slider__swap-image-cover">
        </div>
      </div>
      <button
        class="slider-btn slider__swap-right"
        @click="slider_next"
      >
        <span class="material-icons">keyboard_arrow_right</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
	name: 'Slider',
	props: {
		data: {
			// массив с объектами избражении
			type: Array,
			required: true
		}
	},
	data: () => ({
		selected_image: null // выбранный слайд
	}),
	mounted () {
        // выбор первого элемента в качестве активного слайда
		for (let i = 0; i < this.data.length; i += 1) {
			this.$set(this.data[i], 'Id', i)
			this.$set(this.data[i], 'Selected', false)
			if (i === 0) {
				this.data[i].Selected = true
				this.select_image(this.data[i].Id)
			}
		}
	},
	methods: {
		select_image (id) {
			// обработчик при клике на элемент слайдера
			// будет выбран активный слайд
			for (let i = 0; i < this.data.length; i += 1) {
				this.$set(this.data[i], 'Selected', false)
			}
			this.selected_image = this.data.find(x => x.Id === id)
			this.selected_image.Selected = true
			if (this.data.length > 1) {
				let slider_tag = document.querySelector('.slider .slider__swap-container .slider__swap')
				let slide_tag = slider_tag.querySelector(`.slider__swap-image[data-id='${id}']`)
				if (slide_tag) {
					slide_tag.scrollIntoView({
						behavior: 'smooth',
						block: 'nearest',
						inline: 'center'
					})
				}
			}
		},
		slider_prev () {
			// при клике на кнопку выбора предыдущего слайда
			if (this.selected_image.Id !== 0) {
				this.select_image(this.selected_image.Id - 1)
			}
		},
		slider_next () {
			// при клике на кнопку выбора следующего слайда
			if (this.selected_image.Id !== this.data.length - 1) {
				this.select_image(this.selected_image.Id + 1)
			}
		}
	}
}
</script>

<style scoped lang="scss">
	@import '~assets/variables.scss';

	/* родительский тег компонента */
	.slider-image {
		margin: auto;
		height: 100%;
		width: 100%;

		/* элемент активного слайда */
		.slider__active-image {
			height: 380px;
			width: 100%;
			padding: 16px;
			margin-bottom: 16px;
			box-sizing: border-box;
			display: flex;

			/* сслыка для открытия в новом окне */
			.slider__active-image-link {
				height: 100%;
				display: flex;
				justify-content: center;
				margin: auto;
			}

			/* изображение активного слайда */
			.slider__active-image-cover {
				max-height: 100%;
				max-width: 100%;
			}
		}

		/* контейнер для элементов слайдера */
		.slider__swap-container {
			display: flex;
			flex-direction: row;
			align-items: center;

			/* кнопки управления */
			.slider-btn {
				background: transparent;
				height: 30px;
				width: 30px;
				padding: 0;
				margin: 0;
				border: none;
				outline: none;
				cursor: pointer;

				.material-icons {
					color: $gray;

					&:hover {
						color: $blue-dark;
					}
				}
			}

			/* обертка для элементов слайдера */
			.slider__swap {
				display: flex;
				flex-direction: row;
				align-items: center;
				overflow: hidden;
				overflow-x: auto;

				@include scrollbars(5px, $gray);

				width: 90%;
				height: 100px;
				padding: 16px 0;

				/* элемент слайдера */
				.slider__swap-image {
					padding: 8px;
					margin-right: 8px;
					border-radius: 4px;
					border: 1px solid $gray;
					height: 100%;
					cursor: pointer;

					/* изображение */
					.slider__swap-image-cover {
						max-height: 100%;
					}
				}

				/* модификатор активного элемента слайдера */
				.silder__swap-image_active {
					border: 1px solid $blue-dark;
				}
			}
		}
	}
</style>
