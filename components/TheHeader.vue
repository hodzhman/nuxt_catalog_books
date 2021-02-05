<template>
  <div class="header">
    <div class="header__link header__link_logo">
      <div class="header-link__icon">
        <span class="material-icons">menu_book</span>
      </div>
      <div class="header-link__label">
        R&deg; Книжный магазин
      </div>
    </div>
    <nuxt-link
      class="header__link"
      to="/"
    >
      Каталог
    </nuxt-link>

    <h3 class="header__h3">
      {{ title }}
    </h3>

    <nuxt-link
      class="header__link"
      to="/basket"
      tag="div"
    >
		<div
			v-show="basket_count > 0"
			class="header-link__basket-count"
		>{{ (basket_count < 10) ? basket_count : '+9' }}</div>
      <div class="header-link__icon">
        <span class="material-icons">shopping_cart</span>
      </div>
      <div class="header-link__label">
        Корзина
      </div>
    </nuxt-link>

    <div class="header__link">
      <div class="header-link__icon">
        <span class="material-icons">account_circle</span>
      </div>
      <div class="header-link__label">
        Пользователь
      </div>
    </div>
  </div>
</template>

<script>
	import { mapGetters } from 'vuex'
export default {
	name: 'TheHeader',
	data: () => ({

	}),
	computed: {
		...mapGetters({
			basket_count: 'basket/getBasketCount'
		}),
		title () {
			console.log(this.$router)
			const name_route = this.$router.currentRoute.name
			console.log(name_route)
			switch (name_route) {
			case 'index':
				return 'Каталог книг'
			case 'basket':
				return 'Корзина'
			case 'about':
			case 'about_book':
				return 'Информация о товаре'
			default:
				return '------'
			}
		}
	},
	methods: {

	}

}
</script>

<style scoped lang="scss">
	@import "@/assets/variables.scss";

	.header {
		@include main_font();

		height: 50px;
		border-bottom: 1px solid $gray;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16px;
		@include position(sticky);
		top: 0;
		background: $main-color;

		.header__h3 {
			min-width: 40%;
			text-align: center;
		}

		.header__link {
			width: 100px;
			text-align: center;
			padding: 0 8px;
			cursor: pointer;
			color: $blue-dark;
			text-decoration: none;
			position: relative;

			&.nuxt-link-exact-active,
			&:hover,
			&:active {
				color: $gray;
			}

			.header-link__icon {
				.material-icons {
					font-size: 32px !important;
				}
			}

			.header-link__basket-count{
				background: $blue;
				border-radius: 50%;
				width: 18px;
				height: 18px;
				margin: 0px;
				font-size: 12px;
				color: $main-color;
				position: absolute;
				left: unset;
				right: calc(100% / 2 - 25px);
				top: -6px;
			}

			.header-link__label {
				font-size: 12px;
			}
		}

		.header__link_logo {
			width: 150px;

			&.nuxt-link-exact-active,
			&:hover,
			&:active {
				color: $blue-dark;
			}

			.header-link__label {
				font-size: 14px;
			}
		}
	}
</style>
