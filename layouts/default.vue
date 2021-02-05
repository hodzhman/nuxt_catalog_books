<template>
  <div class="container">
    <TheHeader />
    <div class="container__content">
      <Nuxt />
    </div>
  </div>
</template>

<style lang="scss">
	@import "@/assets/variables.scss";

	html {
		font-family:
			'Source Sans Pro',
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			'Helvetica Neue',
			Arial,
			sans-serif;
		font-size: 16px;
		word-spacing: 1px;
		-ms-text-size-adjust: 100%;
		-webkit-text-size-adjust: 100%;
		-moz-osx-font-smoothing: grayscale;
		-webkit-font-smoothing: antialiased;

		/* box-sizing: border-box; */
	}

	body {
		min-width: 1000px;

		/* width: 100vw; */
		overflow: auto;
		background: $main-color;
		@include scrollbars(5px, gray);
	}

	*,
	*::before,
	*::after {
		/* box-sizing: border-box; */
		margin: 0;
	}

	.container {
		.container__content {
			flex: 1 1 100%;
			margin: auto;
			padding: 24px;
			width: 100%;
			max-width: 900px;
		}
	}
</style>
