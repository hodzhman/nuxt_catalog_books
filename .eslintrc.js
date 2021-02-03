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
		'no-tabs': 0
	}
}
