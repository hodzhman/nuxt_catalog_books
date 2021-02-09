<template>
	<div class="slider-image slider">
		<div class="slider__active-image">
			<a
				v-if="selected_image"
				:href="selected_image.url"
				target="_blank"
				class="slider__active-image-link"
			>
				<img :src="selected_image.url">
			</a>
		</div>

		<div class="slider__swap-container" v-if="data.length > 1">
			<button class="slider-btn slider__swap-left"
					@click="slider_prev"
			>
				<span class="material-icons">keyboard_arrow_left</span>
			</button>
			<div class="slider__swap">
				<div v-for="img in data"
					 :key="img.Id"
					 class="slider__swap-image"
					 :class="[(img.Selected ? 'silder__swap-image_active' : '')]"
					 :data-id="img.Id"
					 @click="select_image(img.Id)"
				>
					<img :src="img.url">
				</div>
			</div>
			<button class="slider-btn slider__swap-right"
					@click="slider_next"
			>
				<span class="material-icons">keyboard_arrow_right</span>
			</button>
		</div>

	</div>
</template>

<script>
    export default {
        name: "slider",
		props: {
        	data: {
        		type: Array,
				required: true
			}
		},
		data: ()=>({
        	slider_selected: '',
			selected_image: null,
		}),
		methods: {
			select_image(id) {
				for(let i = 0; i < this.data.length; i += 1){
					this.$set(this.data[i], 'Selected', false);
				}
				this.selected_image = this.data.find(x => x.Id === id);
				this.selected_image.Selected = true;
				if(this.data.length > 1){
					let slider_tag = document.querySelector('.slider .slider__swap-container .slider__swap'),
						slide_tag = slider_tag.querySelector(`.slider__swap-image[data-id='${id}']`);
					if(slide_tag){
						// slide_tag.scrollIntoView(false);
						slide_tag.scrollIntoView({
							behavior: 'smooth',
							block: 'nearest',
							inline: 'center'
						});
					}
				}
			},
			slider_prev(){
				if(this.selected_image.Id !== 0){
					this.select_image(this.selected_image.Id - 1);
				}
			},
			slider_next(){
				if(this.selected_image.Id !== this.data.length - 1){
					this.select_image(this.selected_image.Id + 1);
				}
			},
		},
		mounted(){
			for(let i = 0; i < this.data.length; i += 1){
				this.$set(this.data[i], 'Id', i);
				this.$set(this.data[i], 'Selected', false);
				if(i === 0){
					this.data[i].Selected = true;
					this.select_image(this.data[i].Id);
				}
			}
		}
    }
</script>

<style scoped lang="scss">
	@import '~assets/variables.scss';
	.slider-image{
		margin: auto;
		height: 100%;
		width: 100%;
		.slider__active-image{
			height: 380px;
			width: 100%;
			padding: 16px;
			margin-bottom: 16px;
			box-sizing: border-box;
			display: flex;
			.slider__active-image-link{
				/*max-width: 100%;*/
				/*max-height: 100%;*/
				height: 100%;
				display: flex;
				justify-content: center;
				margin: auto;
			}
			img{
				max-height: 100%;
				max-width: 100%;
			}
		}
		.slider__swap-container{
			display: flex;
			flex-direction: row;
			align-items: center;
			.slider-btn{
				background: transparent;
				height: 30px;
				width: 30px;
				padding: 0;
				margin: 0;
				border: none;
				outline: none;
				cursor: pointer;
				.material-icons{
					color: $gray;
					&:hover{
						color: $blue-dark;
					}
				}
			}
		}
		.slider__swap{
			display: flex;
			flex-direction: row;
			align-items: center;
			overflow: hidden;
			overflow-x: auto;
			@include scrollbars(5px, $gray);
			width: 90%;
			height: 100px;
			padding: 16px 0;
			.slider__swap-image{
				padding: 8px;
				margin-right: 8px;
				border-radius: 4px;
				border: 1px solid $gray;
				height: 100%;
				cursor: pointer;
			}
			.slider__swap-image img{
				max-height: 100%;
			}
			.silder__swap-image_active{
				border: 1px solid $blue-dark;
			}
		}
	}
</style>
