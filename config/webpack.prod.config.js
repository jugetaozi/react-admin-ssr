process.env.NODE_ENV = 'production'

const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const config = require('./webpack.base.config')

module.exports = merge(config, {
	mode: 'production',
	devtool: 'source-map', //生产环境打开
	plugins: [
		new UglifyJsPlugin({
			cache: true,
			parallel: true,
			sourceMap: true, // set to true if you want JS source maps
		}),
	],
	optimization: {
		minimizer: [
			// new UglifyJsPlugin({
			// 	cache: true,
			// 	parallel: true,
			// 	sourceMap: true, // set to true if you want JS source maps
			// }),
			new OptimizeCSSAssetsPlugin({
				assetNameRegExp: /\.css$/g, // /\.optimize\.css$/g, //正则表达式，用于匹配需要优化或者压缩的资源名。默认值是 /\.css$/g
				cssProcessor: require('cssnano'), //用于压缩和优化CSS 的处理器，默认是 cssnano.这是一个函数，应该按照 cssnano.process 接口(接受一个CSS和options参数，返回一个Promise)
				cssProcessorOptions: {discardComments: {removeAll: true}},
				canPrint: true, //表示插件能够在console中打印信息，默认值是true
			}),
		],
	},
})
