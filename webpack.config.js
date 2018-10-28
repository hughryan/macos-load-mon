const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './ui/index.js',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				options: { presets: ['@babel/env'] },
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
				loader: 'file-loader',
				options: {
					name: 'fonts/[name].[ext]',
				},
			},
			{
				test: /\.(ico)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
				},
			},
		],
	},
	resolve: { extensions: ['*', '.js', '.jsx'] },
	output: {
		path: path.resolve(__dirname, 'dist/'),
		publicPath: '/',
		filename: 'bundle.js',
	},
	performance: { hints: false },
	plugins: [
		new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'index.html') }),
	],
};
