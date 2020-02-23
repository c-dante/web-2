'use strict';
module.exports = {
	extends: [
		'plugin:react/recommended',
	],
	root: true,
	plugins: [
		'@typescript-eslint',
		'react',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		}
	},
	settings: {
		'import/resolver': {
			'webpack': {
				'extensions': ['.js', '.ts']
			}
		},
		'react': {
			'version': '16.10.2'
		}
	},
	rules: {
		'react/react-in-jsx-scope': [0],
		'arrow-parens': [0],
		'object-curly-newline': ['error', {
			'ImportDeclaration': { 'multiline': true, 'minProperties': 6 },
		}],
		// 'react/prop-types': [0],
		'import/prefer-default-export': [0],
		'import/no-named-as-default-member': [0], // could warn, but is noisy with Try and Async
		'class-methods-use-this': [0], // certain methods require it to be a class even if it doesn't use this [ErrorBoundary]
		'quotes': [1, 'single'],
		'jsx-quotes': [1, 'prefer-single'],

		// use tabs only
		'no-tabs': [0],
		'indent': [2, 'tab', { SwitchCase: 1 }],

		// use one space anywhere we allow space
		'no-multi-spaces': [2],

		// no spaces before a functions parameters.
		// good => `function add(a, b){ ... }`
		// bad => `function add (a, b){ ... }`
		'space-before-function-paren': [2],

		// error if we are reassigning function parameters,
		// allow reassigning props of parameters
		'no-param-reassign': [2, { 'props': false }],

		// warn when you don't dangle a comma in a multiline object or array def
		'comma-dangle': [1, 'always-multiline'],

		// use whatever block padding you want
		'padded-blocks': [0],

		// only provide a radix to parseInt if it is not 10
		'radix': [2, 'as-needed'],

		// set max line length to a more reasonable number
		'max-len': [2, 120, {
			ignoreComments: true,
			ignoreUrls: true,
			tabWidth: 1,
		}],

		// Allow for elastic search results
		'no-underscore-dangle': [1, { allow: [ '_source', '_index' ]}],
	},
	env: {
		mocha: true,
		browser: true,
	}
};