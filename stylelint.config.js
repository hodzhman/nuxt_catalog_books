module.exports = {
	extends: [
		'stylelint-config-standard'
	],
	// add your custom config here
	// https://stylelint.io/user-guide/configuration
	rules: {
		indentation: 'tab',
		'no-empty-source': null,
		'at-rule-no-unknown': null,
		'no-descending-specificity': null,
		'at-rule-empty-line-before': null
	}
}
