process.env.NODE_ENV = 'production'

const merge = require('webpack-merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const config = require('./webpack.base.config')
const CompressionWebpackPlugin = require('compression-webpack-plugin') //压缩文件

module.exports = merge(config, {
	mode: 'production',
	// devtool: 'source-map', //生产环境打开
	plugins: [
		new CompressionWebpackPlugin({
			filename: '[path].gz[query]', //asset不被支持 改为filename =>目标资产名称。文件被替换为原始资产。路径将替换为原始资产的路径并使用查询进行查询 默认:[path].gz[query]
			algorithm: 'gzip', //可以是（缓冲区，cb）=> cb（缓冲区），或者如果使用了{String}，则该算法取自zlib` 默认gzip
			test: new RegExp('\\.(js|css)$'), //所有匹配此{RegExp}的资产都会被处理
			// threshold: 1024, //只处理大于此大小的资产。以字节为单位
			// minRatio: 0.8, //只有压缩率小于这个比率的资产才能被处理
			// deleteOriginalAssets: true, //是否删除原始资产
		}),
		new UglifyJsPlugin({
			cache: true,
			uglifyOptions: {
				beautify: false, //最紧凑的压缩
				comment: false, //删除注释
				compress: {
					warnings: false,
					drop_debugger: true, //去掉debugger
					drop_console: true, //去掉console
				},
			},
			parallel: true, //并行压缩
			sourceMap: false, // set to true if you want JS source maps
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
				cssProcessorOptions: { discardComments: { removeAll: true } },
				canPrint: true, //表示插件能够在console中打印信息，默认值是true
			}),
		],
	},
})
