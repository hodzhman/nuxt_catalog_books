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

		<h3 class="header__h3">{{title}}</h3>

		<nuxt-link
			class="header__link"
			to="/basket"
			tag="div"
		>
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
    export default {
        name: "the-header",
		data: ()=>({

		}),
		computed: {
        	title(){
        		let name_route = this.$router.currentRoute.name;
        		console.log(name_route);
        		switch(name_route){
					case 'index':
						return 'Каталог книг';
					case 'basket':
						return 'Корзина';
					case 'about':
						return 'Описание книги';
					default:
						return '------';
				}
			}
		},
		methods: {

		}

    }
</script>

<style scoped lang="scss">
	@import "@/assets/variables.scss";
	.header{
		@include main_font();
		height: 50px;
		border-bottom: 1px solid $gray;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16px;
		posititon: sticky;
		top: 0;
		background: $main-color;

		.header__h3{
			min-width: 40%;
			text-align: center;
		}

		.header__link{
			width: 100px;
			text-align: center;
			padding: 0 8px;
			cursor: pointer;
			color: $blue-dark;
			text-decoration: none;

			&.nuxt-link-exact-active,
			&:hover,
			&:active{
				color: $gray;
			}

			.header-link__icon{
				.material-icons{
					font-size: 32px!important;
				}
			}
			.header-link__label{
				font-size: 12px;
			}
		}
		.header__link_logo{
			width: 150px;
			&.nuxt-link-exact-active,
			&:hover,
			&:active{
				color: $blue-dark;
			}
			.header-link__label{
				font-size: 14px;
			}
		}
	}
</style>
