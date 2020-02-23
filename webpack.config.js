const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const path = require('path');
const webpack = require('webpack');
const APP_PATH = path.resolve(__dirname, 'src');

/**
 * splitChunks plugin config -- separate your build into hash-able chunks for loading/caching
 *
 * @see https://webpack.js.org/plugins/split-chunks-plugin/
 */
const splitChunks = {
	chunks: 'async',
	minSize: 100,
	maxSize: 0,
	minChunks: 1,
	maxAsyncRequests: 5,
	maxInitialRequests: 3,
	automaticNameDelimiter: '~',
	name: true,
	cacheGroups: {
		vendors: {
			test: /[\\/]node_modules[\\/]/,
			chunks: 'all',
			priority: -10,
		},
		styles: {
			name: 'styles',
			test: /\.css$/,
			chunks: 'all',
			enforce: true,
		},
		default: {
			minChunks: 2,
			priority: -20,
			reuseExistingChunk: true,
		},
	},
};

const basePlugins = [
	new HtmlWebpackPlugin({ inject: true, template: path.join(APP_PATH, 'index.html') }),
	new ForkTsCheckerWebpackPlugin(),
	new CircularDependencyPlugin({
		// exclude detection of files based on a RegExp
		exclude: /node_modules/,
		// add errors to webpack instead of warnings
		failOnError: true,
		// allow import cycles that include an asyncronous import,
		// e.g. via import(/* webpackMode: "weak" */ './file.js')
		allowAsyncCycles: false,
		// set the current working directory for displaying module paths
		cwd: __dirname, // always relative to the webpack.config
	}),
];

const devPlugins = [
	new webpack.SourceMapDevToolPlugin({
		columns: true,
		filename: '[file].map[query]',
		// If this gets slow exclude vendors
		// lineToLine: true,
		module: false,
	}),
	new webpack.HotModuleReplacementPlugin(),
];

const prodPlugins = [
];

const prodOptimization = {};

module.exports = ({
	production = false,
} = {}) => {
	// configure plugins/etc
	const mode = production ? 'production' : 'development';

	const plugins = [
		...(production ? prodPlugins : devPlugins),
		...basePlugins,
	];

	const optimization = {
		splitChunks,
		...(production ? prodOptimization : {}),
	};

	return {
		mode,
		plugins,
		optimization,
		entry: APP_PATH,

		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.json'],
		},

		module: {
			rules: [
				{
					loader: 'babel-loader',
					test: /\.(ts|js)x?$/,
					exclude: /node_modules/,
				},
			],
		},

		output: {
			filename: production ? '[name].[contenthash].bundle.js' : '[name].bundle.js',
			publicPath: './',
			path: path.resolve(__dirname, 'dist'),
		},
		// Development settings
		devServer: {
			publicPath: '/',
			hot: true,
			// This is configured to allow client side cors request to some other server
			// @see: https://webpack.js.org/configuration/dev-server/#devserver-proxy
			proxy: {
				'/api': {
					changeOrigin: true,
					target: 'https://api.example.com/',
					pathRewrite: {'^/api' : ''},
					secure: false,
				},
			},
		},

	}
};
