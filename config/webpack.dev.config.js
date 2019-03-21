process.env.NODE_ENV = 'development'

const merge = require('webpack-merge')
const webpack = require('webpack')
const config = require('./webpack.base.config')
const path = require('path')

// const prodMode = process.env.NODE_ENV === 'production';
const srcResolve = function(file) {
	if (file) {
		return path.join(__dirname, '..', 'src', file)
	} else {
		return path.join(__dirname, '..', 'src')
	}
}

module.exports = merge(config, {
	mode: 'development',
	// devtool: 'cheap-module-source-map', //调试方便
	devtool: '#source-map', //耗时久
	entry: {
		index: [
			'react-hot-loader/patch',
			'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
			srcResolve('index.js'),
		],
	},
	plugins: [
		// OccurrenceOrderPlugin is needed for webpack 1.x only
		// new webpack.optimize.OccurrenceOrderPlugin(),
		// new webpack.HotModuleReplacementPlugin(),
		// // Use NoErrorsPlugin for webpack 1.x
		// new webpack.NoEmitOnErrorsPlugin(),

		new webpack.NamedModulesPlugin(),
		// prints more readable module names in the browser console on HMR updates
	],
})
