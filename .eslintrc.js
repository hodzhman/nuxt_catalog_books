module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	parserOptions: {
		parser: 'babel-eslint'
	},
	extends: [
		'@nuxtjs',
		'plugin:nuxt/recommended'
	],
	plugins: [
		'vue'
	],
	// add your custom rules here
	rules: {
		indent: ['error', 'tab'],
		'no-tabs': 0,
		'no-console': 0,
		camelcase: 0,
		'no-mixed-spaces-and-tabs': 0,
		'vue/no-parsing-error': 0,
		'vue/order-in-components': 0,
		'vue/prop-name-casing': 0,
		'vue/require-prop-types': 0,
		'vue/no-mutating-props': 0,
		'vue/no-v-html': 0,
		'vue/no-unused-components': 0,
		'vue/require-v-for-key': 0,
		'no-prototype-builtins': 0

	}
}
