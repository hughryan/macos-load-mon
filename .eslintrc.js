module.exports = {

	plugins: [
		'react',
		'mocha',
		'import',
	],

	extends: [
		'eslint:recommended',
		'airbnb-base',
		'plugin:react/recommended',
	],

	parserOptions: {
		ecmaVersion: 2018,
		ecmaFeatures: {
			jsx: true,
		},
		sourceType: 'module',
	},

	env: {
		node: true,
		es6: true,
		mocha: true,
		browser: true,
	},

	globals: {
		expect: true,
		sinon: true,
		proxyquire: true,
	},

	settings: {
		react: {
			createClass: 'createReactClass',
			pragma: 'React',
			version: '16',
		},
	},

	rules: {
		// eslint-plugin-import
		'import/no-extraneous-dependencies': ['error', {
			devDependencies: [
				'webpack.config.js',
				'**/*.spec.js',
				'test/**',
			],
		}],
		'import/prefer-default-export': ['off'],

		// spacing
		indent: ['error', 'tab'],
		'no-tabs': ['off'],
		'object-curly-spacing': ['error', 'always'],
		'no-trailing-spaces': ['error'],
		'no-irregular-whitespace': ['error'],
		'max-len': ['error', { code: 120 }],

		// other
		'no-console': ['off'],
		'no-bitwise': ['off'],
	},
};
